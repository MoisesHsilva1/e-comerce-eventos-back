import express from "express"
import getAmountProducts from "../../controllers/productControllers/getAmountProducts"

const router = express.Router()

router.get("/", getAmountProducts)

export default router;