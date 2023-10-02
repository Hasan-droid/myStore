import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../features/localStorage";
import axios from "axios";
const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/charts";

export const getItemsDataInChart = axios.get(`${CARDS_URL}`).then((res) => {
  console.log("res.data in getItemsDataInChart", res.data);
  return res.data;
});

let loadStateFromLocalStorage = loadState();
console.log("loadState", loadStateFromLocalStorage);
console.log("hello");
const initialState = {
  ChartData: loadStateFromLocalStorage?.ChartData ?? [],
};

export const receiveItemFromLocalStorage = (dispatch, item) => {
  dispatch(receiveItem(item));
  loadStateFromLocalStorage = loadState();
  saveState(item, loadStateFromLocalStorage);
  console.log("loadStateFromLocalStorage", loadStateFromLocalStorage);
};
export const emptyChart = (dispatch) => {
  dispatch(emptyLocalStorage());
  //remove all items from local storage
  localStorage.removeItem("state");
  console.log("loadStateFromLocalStorage", loadStateFromLocalStorage);
};

const ChartSlicer = createSlice({
  name: "ChartSlicer",
  initialState,
  reducers: {
    receiveItem: (state, action) => {
      state.ChartData.push(action.payload);
      // localStorage.setItem("state", JSON.stringify({ ChartData: state.ChartData }));
    },
    emptyLocalStorage: (state, action) => {
      state.ChartData = [];
    },
  },
});

export const { receiveItem, emptyLocalStorage } = ChartSlicer.actions;
export default ChartSlicer.reducer;
