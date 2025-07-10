import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>The item which you are looking for is not available!</h2>
      <Link
        style={{
          backgroundColor: "blue",
          color: "white",
          textDecoration: "none",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
        to="/"
      >
        Go back to home
      </Link>
    </div>
  );
}

export default NotFound;
