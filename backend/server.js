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

await connectDB();
app.use(bodyParser.json());
app.use("/", router);

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new Error(message);
    return res.status(400).json({
      error: error.message,
    });
  }

  // Handling Mongoose Duplicate Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      error: `${field} must be unique`,
    });
  }

  //Handling Cast Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new Error(message);
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(err.statusCode || 500).json({
    error:error.message || "something went wrong"
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
