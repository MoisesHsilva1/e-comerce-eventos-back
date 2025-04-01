import ProductModel, { Product } from "../../models/products.model";
import { Either, left, right } from "../../core/either";
import { QueryParams } from "../../utils/query.type";

export const getAmountProducts = async (
  query?: QueryParams<Product>
): Promise<Either<string, number>> => {
  try {
    const amountProducts = await ProductModel.countDocuments(query);
    return right(amountProducts);
  } catch (err) {
    return left("Error fetching amount products");
  }
};

export const findByProductName = async (
  query?: QueryParams<Product>
): Promise<Either<string, Product[]>> => {
  try {
    const searchByName = await ProductModel.find(query || []);
    return right(searchByName);
  } catch (err) {
    return left("Error find product");
  }
};
