import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latLong: "",
  coffeeStoresData: [],
};

const coffeeStoreSlice = createSlice({
  name: "coffeeStore",
  initialState,
  reducers: {
    setLatLong: (state, action) => {
      state.latLong = action.payload;
    },
    getCoffeeStores: (state, action) => {
      state.coffeeStoresData = action.payload;
    },
  },
});

export const { setLatLong, getCoffeeStores } = coffeeStoreSlice.actions;
export default coffeeStoreSlice.reducer;
