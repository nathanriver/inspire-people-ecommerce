import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productDetailId, quantity }, { rejectWithValue }) => {
    try {
      const {
        data: { stock, product, productSize },
      } = await API.get(`/product-details/${productDetailId}`);
      const item = {
        name: product.name,
        price: product.price,
        size: productSize.name,
        image_url: product.image_url,
        slug: product.slug,
        productdetail_id: productDetailId,
        weight: product.weight,
        quantity,
        stock,
      };
      return item;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  cartItems: [],
  status: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productdetail_id !== action.payload
      );
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.status = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = "success";
      const productDetailId = action.payload.productdetail_id;
      const isAlreadyExist = state.cartItems.find(
        (item) => item.productdetail_id === productDetailId
      );
      if (isAlreadyExist) {
        state.cartItems = state.cartItems.map((item) => {
          return item.productdetail_id === productDetailId
            ? action.payload
            : item;
        });
      } else {
        state.cartItems.push(action.payload);
      }
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
