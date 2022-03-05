import { configureStore } from "@reduxjs/toolkit";
import coffeeStoreReducer from "./coffeeStoreSlice";
export const store = configureStore({
  reducer: {
    coffeeStore: coffeeStoreReducer,
  },
});
