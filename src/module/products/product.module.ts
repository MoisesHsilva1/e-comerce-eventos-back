import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/model/product.model';
import { ProductService } from './services/products.service';
import { ProductsController } from './products.controller';
import { CloudinaryModule } from 'src/lib/cloudinary/cloudinar.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CloudinaryModule
  ],
  providers: [ProductService],
  controllers: [ProductsController],
})
export class productModule {}
