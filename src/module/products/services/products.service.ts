import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/model/product.schema';
import { Model } from 'mongoose';

export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(name: string, description: string, price: number, category: string): Promise<Product[]> {
    return this.productModel.create();
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
