import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  loginFromHomePage: false,
  pageLoggedInFrom: "",
};

export const LoginInSlicer = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    openModal: (state) => {
      state.openModal = true;
      state.loginFromHomePage = false;
    },
    closeModal: (state) => {
      state.openModal = false;
    },
    loginFromHomePage: (state, action) => {
      state.pageLoggedInFrom = action.payload;
      state.loginFromHomePage = true;
    },
  },
});

export const { openModal, closeModal, loginFromHomePage } = LoginInSlicer.actions;
export default LoginInSlicer.reducer;
