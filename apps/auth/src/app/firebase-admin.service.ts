import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    if (!admin.apps.length) {
      try {
        const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
        const credentials = serviceAccountEnv ? JSON.parse(serviceAccountEnv) : undefined;
        admin.initializeApp({
          credential: credentials ? admin.credential.cert(credentials) : admin.credential.applicationDefault(),
        });
        this.logger.log('Firebase admin initialized');
      } catch (err) {
        this.logger.error('Failed to initialize Firebase admin', err as any);
        throw err;
      }
    }
  }

  get auth() {
    return admin.auth();
  }
}
