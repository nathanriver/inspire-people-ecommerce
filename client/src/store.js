import { configureStore } from "@reduxjs/toolkit";
import bannersReducer from "./features/banners/bannersSlice";
import productReducer from "./features/product/productSlice";
import productListReducer from "./features/productList/productListSlice";
import cartReducer from "./features/cart/cartSlice";
import snackbarReducer from "./features/snackbar/snackbarSlice";
import authReducer from "./features/auth/authSlice";
import addressReducer from "./features/address/addressSlice";
import provinceReducer from "./features/province/provinceSlice";
import cityReducer from "./features/city/cityReducer";

const store = configureStore({
  reducer: {
    banners: bannersReducer,
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    address: addressReducer,
    province: provinceReducer,
    city: cityReducer,
  },
});

export default store;
