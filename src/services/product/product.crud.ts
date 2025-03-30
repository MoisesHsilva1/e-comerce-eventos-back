import ProductModel, { Product } from "../../models/products.model";
import { Either, left, right } from "../../core/either";
import { DeleteResult } from "mongodb";

export const create = async (
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
  } catch (err) {
    return left("Error create product");
  }
};

export const getAll = async (): Promise<Either<string, Product[]>> => {
  try {
    const products = await ProductModel.find();
    return right(products);
  } catch (err) {
    return left("Error fetching products");
  }
};

export const remove = async (
  id?: number
): Promise<Either<string, DeleteResult>> => {
  try {
    const deleteById = await ProductModel.deleteOne({ id });
    return right(deleteById);
  } catch (err) {
    return left("Error delete product");
  }
};
