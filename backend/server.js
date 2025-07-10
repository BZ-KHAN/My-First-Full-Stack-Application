import express from "express";
import { getAllProducts, getSingleProduct } from "./controllers/products.controller.js";
import router from "./routes/routes.products.js";
const app = express();

const PORT = 8000;

app.use('/', router);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
