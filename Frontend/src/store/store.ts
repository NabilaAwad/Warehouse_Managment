import { configureStore } from "@reduxjs/toolkit";
import materialsReducer from './slices/materialsSlice'

export const store = configureStore({
  reducer: {
   materials : materialsReducer,
  },
});