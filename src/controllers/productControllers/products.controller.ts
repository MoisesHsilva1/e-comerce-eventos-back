import { Request, Response } from "express";
import {
  getAllProducts,
  getAmountProducts,
  createAllProducts,
  removeProduct,
} from "../../services/product.service";
import { isLeft, isRight } from "../../core/either";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await getAllProducts();

  if (isRight(result)) {
    res.status(200).json({ success: true, data: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
      details: result.value,
    });
  }
};

export const getAmount = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.query;

  if (typeof name !== "string") {
    res.status(400).json({
      success: false,
      error: "Invalid request",
      message: 'The "name" query parameter is required and must be a string.',
    });
    return;
  }

  const result = await getAmountProducts(name);

  if (isRight(result)) {
    res.status(200).json({ success: true, data: { amountProducts: result.value } });
  }

  if (isLeft(result)) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch product amount",
      details: result.value,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400).json({
      success: false,
      error: "Invalid request",
      message: "All fields (name, description, price, category) are required.",
    });
    return;
  }

  const result = await createAllProducts(name, description, price, category);

  if (isRight(result)) {
    res.status(201).json({ success: true, data: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      success: false,
      error: "Failed to create product",
      details: result.value,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { _id } = req.body;

  if (!_id) {
    res.status(400).json({
      success: false,
      error: "Invalid request",
      message: "The '_id' field is required.",
    });
    return;
  }

  const result = await removeProduct(_id);

  if (isRight(result)) {
    res.status(200).json({ success: true, data: result.value });
  }

  if (isLeft(result)) {
    res.status(500).json({
      success: false,
      error: "Failed to delete product",
      details: result.value,
    });
  }
};
