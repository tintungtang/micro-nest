import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAdminService, FirebaseAuthGuard, RolesGuard],
})
export class AuthModule {}
