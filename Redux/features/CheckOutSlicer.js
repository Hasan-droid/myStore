import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

export const checkOutSlicer = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    openModal: (state) => {
      state.openModal = true;
    },
    closeModal: (state) => {
      state.openModal = false;
    },
  },
});

export const { openModal, closeModal } = checkOutSlicer.actions;
export default checkOutSlicer.reducer;
