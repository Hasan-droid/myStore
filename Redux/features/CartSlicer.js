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
    isItemExist.totalPrice = isItemExist.price * isItemExist.quantity;
    dispatch(increaseQuantity(isItemExist));
    const filteredData = ChartData.filter((chart) => chart.id !== isItemExist.id);
    const newChartData = [...filteredData, isItemExist];
    newChartData.sort((a, b) => a.id - b.id);
    saveState(null, ChartData);
    return;
  }

  //add quantity property to item
  const newItem = { ...item, quantity: 1, totalPrice: item.price };
  const newChartData = [...(ChartData ? ChartData : []), newItem];
  newChartData.sort((a, b) => a.id - b.id);
  dispatch(increaseQuantity(newItem));
  saveState(null, newChartData);
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
    emptyCart(dispatch);
    return;
  }
  localStorage.setItem("state", JSON.stringify({ ChartData: updatedLocalStorage }));
  dispatch(removeItem(item));
};

export const listenItemQuantity = (dispatch, item) => {
  const { clickedItem, quantity } = item;
  loadStateFromLocalStorage = loadState();
  const { ChartData } = loadStateFromLocalStorage;
  const itemToUpdate = ChartData.find((chart) => chart.id === clickedItem.id);
  itemToUpdate.quantity = parseInt(quantity);
  const itemIndex = ChartData.findIndex((chart) => chart.id === itemToUpdate.id);
  ChartData[itemIndex] = itemToUpdate;
  ChartData.sort((a, b) => a.id - b.id);
  saveState(null, ChartData);
  dispatch(listenQuantity(itemToUpdate));
};

export const emptyCart = (dispatch) => {
  dispatch(emptyLocalStorage());
  //remove all items from local storage
  localStorage.removeItem("state");
  console.log("loadStateFromLocalStorage", loadStateFromLocalStorage);
};

const CartSlicer = createSlice({
  name: "CartSlicer",
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
    listenQuantity: (state, action) => {
      const itemIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.chartData[itemIndex].quantity = action.payload.quantity;
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

export const { receiveItem, emptyLocalStorage, removeItem, increaseQuantity, decreaseQuantity, listenQuantity } =
  CartSlicer.actions;
export default CartSlicer.reducer;
