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
    return left(`Error fetching amount of products: ${(err as Error).message}`);
  }
};

export const findByProductQuery = async (
  query?: QueryParams<Product>
): Promise<Either<string, Product[]>> => {
  try {
    const searchByQuery = await ProductModel.find(query || []);
    return right(searchByQuery);
  } catch (err) {
    return left(`Error finding products by query: ${(err as Error).message}`);
  }
};

export const findByProductID = async (
  id?: QueryParams<string>
): Promise<Either<string, Product | null>> => {
  try {
    const searchByID = await ProductModel.findById(id);
    return right(searchByID);
  } catch (err) {
    return left(`Error finding product by ID: ${(err as Error).message}`);
  }
};
