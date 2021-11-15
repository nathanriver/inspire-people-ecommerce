import { configureStore } from "@reduxjs/toolkit";
import bannersReducer from "./features/banners/bannersSlice";
import productReducer from "./features/product/productSlice";
import productListReducer from "./features/productList/productListSlice";

const store = configureStore({
  reducer: {
    banners: bannersReducer,
    productList: productListReducer,
    product: productReducer,
  },
});

export default store;
