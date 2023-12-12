import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

export const LoginInSlicer = createSlice({
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

export const { openModal, closeModal } = LoginInSlicer.actions;
export default LoginInSlicer.reducer;
