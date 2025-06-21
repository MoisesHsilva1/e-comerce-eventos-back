import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/model/product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }): Promise<Product> {
    const newProduct = await this.productModel.create(data);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByProductName(name: string): Promise<Product[]> {
    return this.productModel
      .find({
        name: { $regex: name, $options: 'i' },
      })
      .exec();
  }

  async findByProductID(id: string): Promise<Product[]> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      return [];
    }

    return [product];
  }
}
