import ProductModel from "../../models/products.model";
import { Response, Request } from "express";

const createProducts = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new ProductModel({
      name,
      description,
      price,
      category,
    });

    await newProduct.save();
    res.status(200).json({ product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Err on save product", error });
  }
};
export default createProducts;
