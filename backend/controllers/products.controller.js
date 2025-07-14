import express from "express";
const app = express();
import { Product } from "../model/products.model.js";

export const productsHomePage = (req, res) => {
  res.send("Welcome to home page of products");
};
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.send("Getting all products")
};

export const getSingleProduct = (req, res) => {
  res.send("Getting a single product");
};
export const updateProduct = (req, res) => {
  res.send("Updating a product");
};
export const newProduct = async (req, res) => {
  const newProduct = req.body;
  const p = await Product.create(newProduct);
  res.send(p);
};
export const deleteProduct = (req, res) => {
  res.send("Deleting a product");
};
