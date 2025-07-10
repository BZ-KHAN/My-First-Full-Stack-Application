import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderCart.css";
import CustomDropdown from "./CustomDropdown.jsx";

function Header() {
  const { contacts } = useSelector((state) => state.persistedReducer.contactReducer);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link
        onMouseDown={(event) => event.preventDefault()}
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "0 8px",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
        to="/"
      >
        Home
      </Link>
      <Link
        onMouseDown={(event) => event.preventDefault()}
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "0 8px",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
        to="/products"
      >
        Products
      </Link>
      <Link
        onMouseDown={(event) => event.preventDefault()}
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "0 8px",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
        to="/about"
      >
        AboutUs
      </Link>
      <Link
        onMouseDown={(event) => event.preventDefault()}
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "0 8px",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
        to="/contact"
      >
        ContactUs
      </Link>
      <Link
        onMouseDown={(event) => event.preventDefault()}
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "0 8px",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
        to="/quran"
      >
        Quran Data
      </Link>
      <div
        style={{
          backgroundColor: "green",
          color: "white",
          margin: "0 16px",
          marginLeft: "auto",
          padding: "4px 8px",
          textDecoration: "none",
          borderRadius: "12px",
        }}
      >
        <span className="cart-wrapper">
          <span>Total Contacts</span>
          <span className="cart-badge">
            {contacts.length}
          </span>
        </span>
      </div>
      <div>
        <CustomDropdown />
      </div>
    </div>
  );
}

export default Header;
