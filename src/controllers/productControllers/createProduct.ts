import Product from "../../models/products.model";
import { Response, Request } from "express";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
    });

    await newProduct.save();
    res
      .status(200)
      .json({ message: "Product save with success!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Err on save product", error });
  }
};
export default createProduct;
