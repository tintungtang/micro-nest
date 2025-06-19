import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { Request } from 'express';

@Controller()
export class AuthController {
  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  getMe(@Req() req: Request) {
    return (req as any).user;
  }
}
