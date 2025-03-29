import express from "express"
import { getProducts, getAmount, createProduct, deleteProduct } from "../../controllers/productControllers/products.controller";

const router = express.Router()

router.get("/get", getProducts)
router.get("/getAmount", getAmount )
router.post("/create", createProduct)
router.delete("/delete", deleteProduct)

export default router;