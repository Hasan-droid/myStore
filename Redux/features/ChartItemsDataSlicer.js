import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/charts";
const initialState = {
  loading: false,
  Data: [],
  error: "",
};

export const fetchItemsData = createAsyncThunk("CartItemsDataSlicer/fetchItems", () => {
  return axios.get(CARDS_URL).then((response) => response.data.map((item) => item.title));
});
const CartItemsDataSlicer = createSlice({
  name: "CartItemsDataSlicer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchItemsData.fulfilled, (state, action) => {
      (state.loading = false), (state.Data = action.payload), (state.error = "");
    });
    builder.addCase(fetchItemsData.pending, (state, action) => {
      (state.loading = true), (state.Data = []), (state.error = "");
    });
    builder.addCase(fetchItemsData.rejected, (state, action) => {
      (state.loading = false), (state.Data = []), (state.error = action.error.message);
    });
  },
});

export default CartItemsDataSlicer.reducer;
