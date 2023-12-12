import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartSlicer from "../features/CartSlicer";
import LoginInSlicer from "../features/LoginInSlicer";

const rootReducer = combineReducers({
  CartSlicer: CartSlicer,
  LoginInSlicer: LoginInSlicer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
