import ProductModel, { Product } from "../models/products.model";
import { Either, left, right } from "../core/either";

type productData = {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
};

export const getAllProducts = async (): Promise<
  Either<string, productData[]>
> => {
  try {
    const products = await ProductModel.find();
    return right(products);
  } catch (err: any) {
    return left("Error fetching products");
  }
};

export const getAmountProducts = async (
  name: string
): Promise<Either<string, number>> => {
  try {
    const amountProducts = await ProductModel.countDocuments({ name });
    return right(amountProducts);
  } catch (err: any) {
    return left("Error fetching amount products");
  }
};

export const createAllProducts = async (
  name?: string,
  description?: string,
  price?: number,
  category?: string
): Promise<Either<string, Product>> => {
  if (!name || !description || !price || !category) {
    return left("All fields are required");
  }

  try {
    const newProduct = new ProductModel({
      name,
      description,
      price,
      category,
    });

    const savedProduct = await newProduct.save();

    return right(savedProduct.toObject());
  } catch (err: any) {
    return left("Error create product");
  }
};
