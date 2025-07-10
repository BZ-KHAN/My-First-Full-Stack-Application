import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contactbook",
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      const filteredArr = state.contacts.filter(
        (data) => data.id != action.payload
      );
      state.contacts = filteredArr;
    },
    updateContact: (state, action) => {
      const updatedArr = state.contacts.map((item) =>
        item.id == action.payload.id ? { ...item, ...action.payload.value } : item
      );
      state.contacts = updatedArr;
    },
  },
});

export const { addContact, deleteContact, updateContact } = contactSlice.actions;
export default contactSlice.reducer;
