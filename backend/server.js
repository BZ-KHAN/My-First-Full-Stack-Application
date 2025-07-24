import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "./controllers/products.controller.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import router from "./routes/routes.products.js";
import { routeError } from "./middleware/routeError.js";
import { globalError } from "./middleware/globalError.js";
import "dotenv/config";
const app = express();


await connectDB();
app.use(bodyParser.json());
app.use("/", router);

app.use(routeError);

app.use(globalError);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
});
