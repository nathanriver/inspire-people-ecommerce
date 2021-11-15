import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getProducts = createAsyncThunk(
  "productList/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  isLoading: true,
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productListSlice.reducer;
