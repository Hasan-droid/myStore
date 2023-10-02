import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  error: false,
};

const SignInFromValidationSlicer = createSlice({
  name: "SignInFromValidationSlicer",
  initialState: initalState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = SignInFromValidationSlicer.actions;
export default SignInFromValidationSlicer.reducer;
