import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { productModule } from './module/products/product.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import configuration from './infrastructure/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    productModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
