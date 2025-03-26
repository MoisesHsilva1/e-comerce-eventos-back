import express, { Request } from "express";
import dotenv from "dotenv";
import connectToDataBase from "./config/connectDataBase";
import postProducts from "./routes/productsRoutes/postProducts";
import getProducts from "./routes/productsRoutes/getProducts"
import getAmountProducts from "./routes/productsRoutes/getAmountProducts"
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT_SERVER || 3000;

connectToDataBase();

app.use(cors<Request>());
app.use(express.json());

app.use("/products/post", postProducts);
app.use("/products/get", getProducts)
app.use("/products/getAmount", getAmountProducts)

app.listen(port, () => console.log(`Server running on port ${port}`));
