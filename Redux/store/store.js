import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ChartSlicer from "../features/ChartSlicer";

const rootReducer = combineReducers({
  ChartSlicer: ChartSlicer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
