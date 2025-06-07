import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/model/product.schema';
import { ProductService } from './services/products.service';
import { ProductsController } from './products.controller';
import { CloudinaryProvider } from 'src/config/cloudinary/cloudinary.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, CloudinaryProvider],
  controllers: [ProductsController],
})
export class productModule {}
