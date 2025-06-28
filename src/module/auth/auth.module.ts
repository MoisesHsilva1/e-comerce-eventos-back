import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async () => {
        const app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID as string,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
              /\\n/g,
              '\n',
            ) as string,
          }),
        });
        return app;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class AuthModule {}
