import express from "express";
const app = express();

export const productsHomePage = (req, res) => {
  res.send("Welcome to home page of products");
};
export const getAllProducts = (req, res) => {
  const products = [
    {
      title: "Oppo Mobile 1",
      description: "Some Description",
      price: 7000,
    },
    {
      title: "Oppo Mobile 2",
      description: "Some Description",
      price: 7000,
    },
    {
      title: "Oppo Mobile 3",
      description: "Some Description",
      price: 7000,
    },
    {
      title: "Oppo Mobile 4",
      description: "Some Description",
      price: 7000,
    },
    {
      title: "Oppo Mobile 5",
      description: "Some Description",
      price: 7000,
    },
  ];

  res.send(products);
};

export const getSingleProduct = (req, res) => {
  res.send("Getting a single product");
};
export const updateProduct = (req, res) => {
  res.send("Updating a product");
};
export const newProduct = (req, res) => {
  res.send("Sending a new product");
};
export const deleteProduct = (req, res) => {
  res.send("Deleting a product");
};
