import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productModule } from './module/products/product.module';

@Module({
  imports: [DatabaseModule, productModule],
})
export class AppModule {}
