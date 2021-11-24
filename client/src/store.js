import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import snackbarReducer from "./features/snackbar/snackbarSlice";
import authReducer from "./features/auth/authSlice";
import addressReducer from "./features/address/addressSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    address: addressReducer,
  },
});

export default store;
