import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

function reducer(state = initialState, action) {
   
  return state;
}

// Create the Redux store
const store = configureStore({
  reducer: reducer,
});

export default store;
