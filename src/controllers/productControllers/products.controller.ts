import { Request, Response } from "express";
import {
  getAllProducts,
  getAmountProducts,
  createAllProducts,
} from "../../services/product.service";
import { isLeft, isRight } from "../../core/either";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await getAllProducts();

  if (isRight(result)) {
    res.status(200).json({ products: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      error: "Failed to fetch products",
      details: result.value,
    });
  }
};

export const getAmount = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.query;

  if (typeof name !== "string") {
    res.status(400).json({
      error: 'Invalid request',
      message: 'The "name" query parameter is required and must be a string.',
    });
    return;
  }

  const result = await getAmountProducts(name);

  if (isRight(result)) {
    res.status(200).json({ amountProducts: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      error: "Failed to fetch product amount",
      details: result.value,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400).json({
      error: "Invalid request",
      message: "All fields (name, description, price, category) are required.",
    });
    return;
  }

  const result = await createAllProducts(name, description, price, category);

  if (isRight(result)) {
    res.status(200).json({ product: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      error: "Failed to create product",
      details: result.value,
    });
  }
};
