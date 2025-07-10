import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw } from "../redux/depositReducer";

function About() {
  const { value } = useSelector(
    (state) => state.persistedReducer.depositReducer
  );

  // console.log(value);

  const dispatch = useDispatch();

  const depositAmount = () => {
    dispatch(deposit());
  };
  const withdrawAmount = () => {
    dispatch(withdraw());
  };

  return (
    <div style={{ marginLeft: "4px", marginTop: "8px", marginBottom: "0" }}>
      <button
        style={{ background: "green", marginRight: "4px" }}
        onClick={depositAmount}
      >
        deposit
      </button>
      <button
        style={{ background: "green", marginLeft: "4px" }}
        onClick={withdrawAmount}
      >
        withdraw
      </button>
      <h1 style={{ marginTop: "0", marginLeft: "52px" }}>${value}</h1>
    </div>
  );
}

export default About;
