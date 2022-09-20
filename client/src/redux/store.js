import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./states/user";
import authSlice from "./states/auth/authSlice";
import cartSlice from "./states/cart/cartSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    cart: cartSlice
  }
});
