import { Request, Response } from "express";
import {
  getAmountProducts,
  findByProductName,
} from "../../services/product/product.search";
import { create, remove, getAll } from "../../services/product/product.crud";
import { isLeft, isRight } from "../../core/either";
import { sendSuccess, sendError } from "../../utils/response";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await getAll();

  if (isRight(result)) {
    sendSuccess(res, result.value);
    return;
  }

  if (isLeft(result)) {
    sendError(res, "Failed to fetch products", result.value);
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

  const result = await getAmountProducts({ name });

  if (isRight(result)) {
    sendSuccess(res, { amountProducts: result.value });
  }

  if (isLeft(result)) {
    sendError(res, "Failed to fetch product amount", result.value);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    sendError(
      res,
      "Invalid request",
      "All fields (name, description, price, category) are required."
    );
    return;
  }

  const result = await create(name, description, price, category);

  if (isRight(result)) {
    sendSuccess(res, result.value);
  }

  if (isLeft(result)) {
    sendError(res, "Failed to create product", result.value);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.body;

  if (!_id) {
    sendError(res, "Invalid request", "The '_id' field is required.");
    return;
  }

  const result = await remove(_id);

  if (isRight(result)) {
    sendSuccess(res, result.value);
  }

  if (isLeft(result)) {
    sendError(res, "Failed to delete product", result.value);
  }
};

export const searchByProductName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.query;

  if (typeof name !== "string") {
    sendError(
      res,
      "Invalid request",
      'The "name" query parameter is required and must be a string.'
    );
    return;
  }

  const result = await findByProductName({ name });

  if (isRight(result)) {
    sendSuccess(res, result.value);
    return;
  }

  if (isLeft(result)) {
    sendError(res, "Failed to fetch product", result.value);
  }
};
