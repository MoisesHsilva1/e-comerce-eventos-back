import { forwardRef, Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/model/user.model';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
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
  exports: ['FIREBASE_ADMIN', AuthService],
})
export class AuthModule {}
