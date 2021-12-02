import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import snackbarReducer from "./features/snackbar/snackbarSlice";
import authReducer from "./features/auth/authSlice";
import addressReducer from "./features/address/addressSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import productSizesReducer from "./features/product-sizes/productSizesSlice";
import bannersReducer from "./features/banners/bannersSlice";
import productsReducer from "./features/products/productsSlice";
import productDetailsReducer from "./features/product-details/productDetailsSlice";
import ordersReducer from "./features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    address: addressReducer,
    categories: categoriesReducer,
    productSizes: productSizesReducer,
    banners: bannersReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    orders: ordersReducer,
  },
});

export default store;
