import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  loginFromHomePage: false,
  pageLoggedInFrom: "",
  loginFromPhone: false,
  windowSize: 0,
};

export const LoginInSlicer = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    loginFromHomePage: (state, action) => {
      state.pageLoggedInFrom = action.payload;
      state.loginFromHomePage = true;
    },
    loginFromPhone: (state) => {
      state.loginFromPhone = true;
    },
    windowSize: (state, action) => {
      state.windowSize = action.payload;
    },
  },
});

export const { loginFromHomePage, loginFromPhone, windowSize } = LoginInSlicer.actions;
export default LoginInSlicer.reducer;
