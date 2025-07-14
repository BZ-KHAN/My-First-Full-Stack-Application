import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "./controllers/products.controller.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import router from "./routes/routes.products.js";
const app = express();

const PORT = 8000;

connectDB();
app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
