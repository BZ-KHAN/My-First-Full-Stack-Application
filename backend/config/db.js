import mongoose from "mongoose";
import { Product } from "../model/products.model.js";

export const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/e-commerce")
      .then(() => console.log("DataBase Connected!"));
    await Product.syncIndexes();
  } catch (error) {
    console.log(error);
  }
};
