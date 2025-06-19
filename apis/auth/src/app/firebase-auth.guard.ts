import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebase: FirebaseAdminService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const match = /^Bearer\s+(.*)$/.exec(Array.isArray(authHeader) ? authHeader[0] : authHeader);
    if (!match) {
      throw new UnauthorizedException('Invalid authorization header');
    }
    const token = match[1];
    try {
      const decoded = await this.firebase.auth.verifyIdToken(token);
      (request as any).user = decoded;
      const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (requiredRoles && requiredRoles.length) {
        const userRoles: string[] = (decoded as any).roles || (decoded as any).role ? [ (decoded as any).role ] : [];
        const hasRole = requiredRoles.some((role) => userRoles.includes(role));
        if (!hasRole) {
          throw new ForbiddenException('Insufficient role');
        }
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
