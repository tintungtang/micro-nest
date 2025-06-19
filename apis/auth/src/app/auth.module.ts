import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAdminService, FirebaseAuthGuard],
  exports: [FirebaseAdminService, FirebaseAuthGuard],
})
export class AuthModule {}
