import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { productModule } from './module/products/product.module';
import { userModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    productModule,
    userModule,
  ],
})
export class AppModule {}
