import mongoose from "mongoose";
import { Product } from "../model/products.model.js";
import "dotenv/config";


export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(() => console.log("DataBase Connected!"));
    await Product.syncIndexes();
  } catch (error) {
    console.log(error);
  }
};
