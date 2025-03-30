import ProductModel, { Product } from "../../models/products.model";
import { Either, left, right } from "../../core/either";

export const getAmountProducts = async (
  name: string
): Promise<Either<string, number>> => {
  try {
    const amountProducts = await ProductModel.countDocuments({ name });
    return right(amountProducts);
  } catch (err) {
    return left("Error fetching amount products");
  }
};

export const findByProductName = async (
  name?: string
): Promise<Either<string, Product>> => {
  try {
    const searchByName = await ProductModel.findOne({ name });
    return right(searchByName?.toObject() as Product);
  } catch (err) {
    return left("Error find product");
  }
};
