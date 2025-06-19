import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
