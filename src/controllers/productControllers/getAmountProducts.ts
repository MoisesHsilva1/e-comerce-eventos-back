import ProductModel from "../../models/products.model";
import { Request, Response } from "express";

const getAmountProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({ message: "name is required" });
      return;
    }

    const amountProducts = await ProductModel.countDocuments({ name });

    res.status(200).json({ amountProducts });
  } catch (err: any) {
    res.status(500).json({ message: "Error in find amount products", err });
  }
};
export default getAmountProducts;
