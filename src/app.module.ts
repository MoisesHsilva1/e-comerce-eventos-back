import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAdminModule } from '@alpha018/nestjs-firebase-auth';
import { ExtractJwt } from 'passport-jwt';

import { DatabaseModule } from './database/database.module';
import { productModule } from './module/products/product.module';
import { userModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        base64: configService.get<string>('FIREBASE_SERVICE_ACCOUNT_BASE64'),
        auth: {
          config: {
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken()
          },
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    productModule,
    userModule,
  ],
})
export class AppModule {}
