import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true,'please provide a title'],
    minLength: [10, 'title should be atleast 10 characters'],
    maxLength: [30, 'title should be at most 30 characters']
  },
  description: {
    type: String,
    minLength: [10, 'description should be at least 10 characters'],
    maxLength:[100, 'description should be at most 100 characters']
  },
  price: {
    type: Number,
    required: [true,'please provide a price in number'],
    min: [10, 'price should be atleast 10 rupees'],
    max: [5000, 'price should me at most 5000 rupees']
  },
  stock: {
    type: Number,
    required: [true,'please provide a stock quantity in number'],
    min: [0, 'stock should be atleast 0 quantity'],
    max: [1000, 'stock should be at most 1000 quantities']
  },
});

export const Product = mongoose.model("product", productSchema);
