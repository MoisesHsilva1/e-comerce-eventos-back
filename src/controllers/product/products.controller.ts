import { Request, Response } from "express";
import {
  getAmountProducts,
  findByProductQuery,
  findByProductID,
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
    sendError(res, "Failed to fetch products", `Error: ${result.value}`);
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
    sendError(
      res,
      "Failed to fetch product amount",
      `Error while fetching product amount for name "${name}": ${result.value}`
    );
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
    sendError(
      res,
      "Failed to create product",
      `Error while creating product "${name}": ${result.value}`
    );
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
    sendError(
      res,
      "Failed to delete product",
      `Error while deleting product with ID "${_id}": ${result.value}`
    );
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

  const result = await findByProductQuery({ name });

  if (isRight(result)) {
    sendSuccess(res, result.value);
    return;
  }

  if (isLeft(result)) {
    sendError(
      res,
      "Failed to fetch product",
      `Error while searching for product with name "${name}": ${result.value}`
    );
  }
};

export const searchByProductID = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    sendError(res, "Invalid request", 'The "id" param is required');
    return;
  }

  const result = await findByProductID(id);

  if (isRight(result)) {
    sendSuccess(res, result.value);
    return;
  }

  if (isLeft(result)) {
    sendError(
      res,
      "Failed to fetch product",
      `Error while searching for product with ID "${id}": ${result.value}`
    );
  }
};
