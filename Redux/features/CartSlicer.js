import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../features/localStorage";
import axios from "axios";
const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/charts";

export const getItemsDataInCart = axios.get(`${CARDS_URL}`).then((res) => {
  console.log("res.data in getItemsDataInCart", res.data);
  return res.data;
});

let loadStateFromLocalStorage = loadState();
console.log("loadState", loadStateFromLocalStorage);
console.log("hello");
const initialState = {
  cartData: loadStateFromLocalStorage?.CartData ?? [],
};

export const increaseItemQuantityByOne = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { CartData } = loadStateFromLocalStorage;
  const isItemExist = CartData?.find((cart) => cart.id === item.id);
  if (isItemExist) {
    isItemExist.quantity += 1;
    isItemExist.totalPrice = isItemExist.price * isItemExist.quantity;
    dispatch(increaseQuantity(isItemExist));
    const filteredData = CartData.filter((cart) => cart.id !== isItemExist.id);
    const newCartData = [...filteredData, isItemExist];
    newCartData.sort((a, b) => a.id - b.id);
    saveState(null, CartData);
    return;
  }

  //add quantity property to item
  const newItem = { ...item, quantity: 1, totalPrice: item.price };
  const newCartData = [...(CartData ? CartData : []), newItem];
  newCartData.sort((a, b) => a.id - b.id);
  dispatch(increaseQuantity(newItem));
  saveState(null, newCartData);
};

export const decreaseItemQuantityByOne = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { CartData } = loadStateFromLocalStorage;
  const itemToDelete = loadStateFromLocalStorage.CartData?.find((cart) => cart.id === item.id);
  if (itemToDelete.quantity === 1) return;
  itemToDelete.quantity -= 1;
  const itemIndex = CartData.findIndex((cart) => cart.id === itemToDelete.id);
  CartData[itemIndex] = itemToDelete;
  CartData.sort((a, b) => a.id - b.id);
  saveState(null, CartData);
  dispatch(decreaseQuantity(itemToDelete));
};

export const removeItemFromCart = (dispatch, item) => {
  loadStateFromLocalStorage = loadState();
  const { CartData } = loadStateFromLocalStorage;
  const updatedLocalStorage = CartData.filter((cart) => cart.id !== item.id);
  if (updatedLocalStorage.length === 0) {
    emptyCart(dispatch);
    return;
  }
  localStorage.setItem("state", JSON.stringify({ CartData: updatedLocalStorage }));
  dispatch(removeItem(item));
};

export const listenItemQuantity = (dispatch, item) => {
  const { clickedItem, quantity } = item;
  loadStateFromLocalStorage = loadState();
  const { CartData } = loadStateFromLocalStorage;
  const itemToUpdate = CartData.find((cart) => cart.id === clickedItem.id);
  itemToUpdate.quantity = parseInt(quantity);
  const itemIndex = CartData.findIndex((cart) => cart.id === itemToUpdate.id);
  CartData[itemIndex] = itemToUpdate;
  CartData.sort((a, b) => a.id - b.id);
  saveState(null, CartData);
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
      state.cartData.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartData[itemIndex].quantity += 1;
        return;
      }
      state.cartData.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartData[itemIndex].quantity -= 1;
      }
    },
    listenQuantity: (state, action) => {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartData[itemIndex].quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.cartData.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartData.splice(itemIndex, 1);
      }
    },
    emptyLocalStorage: (state) => {
      state.cartData = [];
    },
  },
});

export const { receiveItem, emptyLocalStorage, removeItem, increaseQuantity, decreaseQuantity, listenQuantity } =
  CartSlicer.actions;
export default CartSlicer.reducer;
