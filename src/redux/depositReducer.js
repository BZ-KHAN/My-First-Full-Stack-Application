import { createSlice } from "@reduxjs/toolkit";

const depositSlice = createSlice({
  name: "bank",
  initialState: {
    value: 0,
  },
  reducers: {
    deposit: (state) => {
      state.value = state.value + 10;
    },
    withdraw: (state) => {
      if (state.value >= 10) {
        state.value = state.value - 10;
      }
    },
  },
});

export const { deposit, withdraw } = depositSlice.actions;
export default depositSlice.reducer;
