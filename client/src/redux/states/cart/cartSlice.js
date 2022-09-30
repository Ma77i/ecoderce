import { createSlice } from "@reduxjs/toolkit";

export const cartEmptyState = [{
  _id: "",
  timestamp: 0,
  products: [],
  user: "",
  total: 0
}];

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartEmptyState,
  reducers: {
    createCart: (state, action) => action.payload,
    modifyCart: (state, action) => ({ ...state, ...action.payload }),
    resetCart: () => cartEmptyState
  }
});

export const { createCart, modifyCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

