import express from "express"
import createProduct from "../../controllers/productControllers/createProduct"

const router = express.Router()

router.get("/", createProduct)

export default router;