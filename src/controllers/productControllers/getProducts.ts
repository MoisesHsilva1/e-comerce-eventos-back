import ProductModel from "../../models/products.model";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", err });
  }
};
export default getProducts;
