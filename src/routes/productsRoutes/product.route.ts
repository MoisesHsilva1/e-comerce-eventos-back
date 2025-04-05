import express from "express";
import {
  getAllProducts,
  getAmount,
  createProduct,
  deleteProduct,
  searchByProductName,
  searchByProductID,
} from "../../controllers/product/products.controller";

const router = express.Router();

router.get("/get", getAllProducts);
router.get("/getAmount", getAmount);
router.post("/create", createProduct);
router.delete("/delete", deleteProduct);
router.get("/searchByName", searchByProductName);
router.get("/id/:id", searchByProductID);

export default router;
