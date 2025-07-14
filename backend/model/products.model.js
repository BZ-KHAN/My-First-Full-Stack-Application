import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
});

export const Product = mongoose.model("product", productSchema);
