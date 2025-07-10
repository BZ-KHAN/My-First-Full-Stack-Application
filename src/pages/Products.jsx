import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../assets/tp-spinner.gif";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <img
              src={Loader}
              alt="Loading..."
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                backgroundColor: "transparent",
              }}
            />
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                transition: "transform 0.3s",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ fontSize: "18px", textAlign: "center" }}>
                {product.title}
              </h3>
              <p style={{ fontWeight: "bold", color: "#ff5722" }}>
                Rs. {product.price}
              </p>
              <p
                style={{ fontSize: "14px", color: "#555", textAlign: "center" }}
              >
                {product.category}
              </p>
              <button
                style={{
                  marginTop: "auto",
                  padding: "10px 20px",
                  backgroundColor: "#ff5722",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
