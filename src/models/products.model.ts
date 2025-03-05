import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Product = model("Products", productsSchema);

export default Product;
