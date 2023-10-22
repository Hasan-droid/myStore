import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../features/localStorage";
import axios from "axios";
import Chart from "../../components/Chart";
const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/charts";

export const getItemsDataInChart = axios.get(`${CARDS_URL}`).then((res) => {
  console.log("res.data in getItemsDataInChart", res.data);
  return res.data;
});

let loadStateFromLocalStorage = loadState();
console.log("loadState", loadStateFromLocalStorage);
console.log("hello");
const initialState = {
  chartData: loadStateFromLocalStorage?.ChartData ?? [],
};

export const receiveItemFromLocalStorage = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { ChartData } = loadStateFromLocalStorage;
  // console.log("ChartData", ChartData);
  // console.log("item receive item", item);
  const isItemExist = loadStateFromLocalStorage.ChartData?.find((chart) => chart.id === item.id);
  if (isItemExist) {
    debugger;
    isItemExist.quantity += 1;
    dispatch(increaseQuantity(isItemExist));
    const filteredData = ChartData.filter((chart) => chart.id !== isItemExist.id);
    //replace item with isItemExist in local storage
    // const newChartData = ChartData.map((chart) => {
    //   if (chart.id === isItemExist.id) {
    //     return isItemExist;
    //   }
    //   return chart;
    // });
    // localStorage.setItem("state", JSON.stringify({ ChartData: newChartData }));
    saveState(isItemExist, filteredData);
    return;
  }
  //add quantity property to item
  const newItem = { ...item, quantity: 1 };
  dispatch(receiveItem(newItem));
  saveState(newItem, ChartData);
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
      state.chartData.push(action.payload);
      // localStorage.setItem("state", JSON.stringify({ ChartData: state.ChartData }));
    },
    increaseQuantity: (state, action) => {
      state.chartData.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
      });
    },
    emptyLocalStorage: (state) => {
      state.chartData = [];
    },
  },
});

export const { receiveItem, emptyLocalStorage, increaseQuantity } = ChartSlicer.actions;
export default ChartSlicer.reducer;
