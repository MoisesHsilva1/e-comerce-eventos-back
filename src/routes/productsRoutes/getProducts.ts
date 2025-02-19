import express from "express"
import getProducts from "../../controllers/productControllers/getProducts";

const router = express.Router()

router.get("/", getProducts)

export default router;