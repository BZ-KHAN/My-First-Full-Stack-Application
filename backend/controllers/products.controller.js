import express from "express";
const app = express();
import { Product } from "../model/products.model.js";

export const productsHomePage = (req, res) => {
  res.send("Welcome to home page of products");
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const p = await Product.findById(id);
    if (!p) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    } else {
      res.status(200).json(p);
    }
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const p = await Product.findByIdAndUpdate(id, body);
    if (!p) {
      const error = new Error("Product not found against this ID");
      error.statusCode = 404;
      return next(error);
    } else {
      res.json(p);
    }
  } catch (error) {
    next(error);
  }
};
export const newProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const p = await Product.create(newProduct);
    res.json(p);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const p = await Product.findByIdAndDelete(id);
    if (!p) {
      const error = new Error("Product not found against this ID");
      error.statusCode = 404;
      next(error);
    } else {
      res.json(p);
    }
  } catch (error) {
    next(error);
  }
};
