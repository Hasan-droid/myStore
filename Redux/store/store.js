import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartSlicer from "../features/CartSlicer";

const rootReducer = combineReducers({
  CartSlicer: CartSlicer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
