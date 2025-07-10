import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CustomDropdown.css";
import ShoppingCart from "../assets/shopping-bag.png";

const CustomDropdown = () => {
  const { contacts } = useSelector(
    (state) => state.persistedReducer.contactReducer
  );
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    const dropdown = document.getElementById("dropdownPanel");
    dropdown.classList.remove("show");
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // wait for animation
  };

  return (
    <div className="dropdown-container">
      <button
        style={{ position: "relative" }}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setIsOpen(true)}
        className="open-button"
      >
        <img className="cart-icon" src={ShoppingCart} alt="shopping-cart" />
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "black",
            color: "white",
            padding: "2px 4px",
            borderRadius: "50%",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {contacts.length}
        </span>
      </button>

      {isOpen && (
        <div
          className="backdrop"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={closeDropdown}
        ></div>
      )}

      <div
        id="dropdownPanel"
        onMouseDown={(event) => event.preventDefault()}
        className={`dropdown ${isOpen ? "show" : ""}`}
      >
        <div className="dropdown-header">
          <h2>Dropdown Panel</h2>
          <button className="close-button" onClick={closeDropdown}>
            ✕
          </button>
        </div>
        <div className="dropdown-content">
          <p>This dropdown covers full height and is 400px wide.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
