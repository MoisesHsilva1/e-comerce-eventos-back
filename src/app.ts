import express, { Request } from "express";
import dotenv from "dotenv";
import connectToDataBase from "./config/connectDataBase";
import productRoute from "./routes/productsRoutes/product.route"
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT_SERVER || 3000;

connectToDataBase();

app.use(cors<Request>());
app.use(express.json());

app.use("/products", productRoute)


app.listen(port, () => console.log(`Server running on port ${port}`));
