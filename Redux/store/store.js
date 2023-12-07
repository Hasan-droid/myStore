import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartSlicer from "../features/CartSlicer";
import CheckOutSlicer from "../features/CheckOutSlicer";

const rootReducer = combineReducers({
  CartSlicer: CartSlicer,
  CheckOutSlicer: CheckOutSlicer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
