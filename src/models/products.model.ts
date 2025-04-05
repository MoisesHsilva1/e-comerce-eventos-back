import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model("Products", productSchema);

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
}

export default Product;
