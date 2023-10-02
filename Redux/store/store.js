import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ChartSlicer from "../features/ChartSlicer";
// import ChartItemsDataSlicer from "../features/ChartItemsDataSlicer";
// import SignInFromValidationSlicer from "../features/SignInFromValidationSlicer";
import { loadState, saveState } from "../features/localStorage";

const rootReducer = combineReducers({
  ChartSlicer: ChartSlicer,
  // ChartItemsDataSlicer: ChartItemsDataSlicer,
  // SignInFromValidationSlicer: SignInFromValidationSlicer,
});

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: loadState(),
});

// store.subscribe(() => {
//   console.log("store.getState()", store.getState());
//   saveState(store.getState().ChartSlicer);
// });

export default store;

// Path: Redux\features\ChartSlicer.js
