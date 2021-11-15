import { configureStore } from "@reduxjs/toolkit";
import bannersReducer from "./features/banners/bannersSlice";
import productReducer from "./features/product/productSlice";
import productListReducer from "./features/productList/productListSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    banners: bannersReducer,
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
