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

export const increaseItemQuantityByOne = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { ChartData } = loadStateFromLocalStorage;
  // console.log("ChartData", ChartData);
  // console.log("item receive item", item);
  const isItemExist = ChartData?.find((chart) => chart.id === item.id);
  if (isItemExist) {
    isItemExist.quantity += 1;
    dispatch(increaseQuantity(isItemExist));
    const filteredData = ChartData.filter((chart) => chart.id !== isItemExist.id);
    const itemIndex = filteredData.findIndex((chart) => chart.id === isItemExist.id);
    ChartData[itemIndex] = isItemExist;
    //send empty state to saveState function
    //sort ChartData according to the id's
    ChartData.sort((a, b) => a.id - b.id);

    saveState(null, ChartData);
    // localStorage.setItem("state", JSON.stringify({ ChartData: ChartData }));
    // saveState(isItemExist, filteredData);
    return;
  }
  //add quantity property to item
  const newItem = { ...item, quantity: 1 };
  dispatch(increaseQuantity(newItem));
  saveState(newItem, ChartData);
};

export const decreaseItemQuantityByOne = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { ChartData } = loadStateFromLocalStorage;
  const itemToDelete = loadStateFromLocalStorage.ChartData?.find((chart) => chart.id === item.id);
  if (itemToDelete.quantity === 1) return;
  itemToDelete.quantity -= 1;
  const itemIndex = ChartData.findIndex((chart) => chart.id === itemToDelete.id);
  ChartData[itemIndex] = itemToDelete;
  ChartData.sort((a, b) => a.id - b.id);
  saveState(null, ChartData);
  dispatch(decreaseQuantity(itemToDelete));
};

export const removeItemFromCart = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { ChartData } = loadStateFromLocalStorage;
  const updatedLocalStorage = ChartData.filter((chart) => chart.id !== item.id);
  if (updatedLocalStorage.length === 0) {
    emptyChart(dispatch);
    return;
  }
  localStorage.setItem("state", JSON.stringify({ ChartData: updatedLocalStorage }));
  dispatch(removeItem(item));
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
      const itemIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.chartData[itemIndex].quantity += 1;
        return;
      }
      state.chartData.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.chartData[itemIndex].quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.chartData.splice(itemIndex, 1);
      }
    },
    emptyLocalStorage: (state) => {
      state.chartData = [];
    },
  },
});

export const { receiveItem, emptyLocalStorage, removeItem, increaseQuantity, decreaseQuantity } =
  ChartSlicer.actions;
export default ChartSlicer.reducer;
