import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';

@Injectable()
export class FirebaseAdminService {
  private app: admin.app.App;
  public auth: admin.auth.Auth;

  constructor() {
    if (admin.apps.length === 0) {
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
      let credential: admin.ServiceAccount | undefined;
      try {
        if (serviceAccountPath) {
          const file = readFileSync(serviceAccountPath, 'utf8');
          credential = JSON.parse(file);
        } else if (process.env.FIREBASE_PROJECT_ID) {
          credential = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          } as admin.ServiceAccount;
        }
      } catch (err) {
        Logger.error('Failed to load Firebase credentials', err as any);
      }
      this.app = admin.initializeApp({
        credential: credential ? admin.credential.cert(credential) : undefined,
      });
    } else {
      this.app = admin.app();
    }
    this.auth = this.app.auth();
  }
}
