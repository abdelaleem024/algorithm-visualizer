import { configureStore } from "@reduxjs/toolkit";
import gridSliceReducer from "./grid";

const reducer = {
  grid: gridSliceReducer,
};
const store = configureStore({
  reducer,
});

export default store;
