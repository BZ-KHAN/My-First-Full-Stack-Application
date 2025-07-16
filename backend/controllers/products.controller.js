import express from "express";
const app = express();
import { Product } from "../model/products.model.js";

export const productsHomePage = (req, res) => {
  res.send("Welcome to home page of products");
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const p = await Product.findById(id);
  res.json(p);
};
export const updateProduct = async(req, res) => {
  const { id } = req.params;
  const body = req.body;
  const p = await Product.findByIdAndUpdate(id, body);
  res.json(p)
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
export const deleteProduct = async(req, res) => {
  const { id } = req.params;
  const p = await Product.findByIdAndDelete(id);
  res.json(p);
};
