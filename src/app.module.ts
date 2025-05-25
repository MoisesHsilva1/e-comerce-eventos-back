import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { productModule } from './module/products/product.module';

@Module({
  imports: [DatabaseModule, productModule],
})
export class AppModule {}
