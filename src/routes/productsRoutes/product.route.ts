import express from "express"
import { getProducts, getAmount, createProduct } from "../../controllers/productControllers/products.controller";

const router = express.Router()

router.get("/get", getProducts)
router.get("/getAmount", getAmount )
router.post("/create", createProduct)

export default router;