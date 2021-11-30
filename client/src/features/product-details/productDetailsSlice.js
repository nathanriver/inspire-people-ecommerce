import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/${productId}/product-details`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addProductDetail = createAsyncThunk(
  "productDetails/addProductDetail",
  async ({ productId, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        `/products/${productId}/product-details`,
        values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProductDetail = createAsyncThunk(
  "productDetails/deleteProductDetail",
  async ({ productId, id }, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${productId}/product-details/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProductDetail = createAsyncThunk(
  "productDetails/updateProductDetail",
  async ({ productId, id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(
        `/products/${productId}/product-details/${id}`,
        values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  productDetails: [],
  isLoading: true,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  extraReducers: {
    //  Get product details
    [getProductDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Add product detail
    [addProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productDetails.push(action.payload);
    },
    [addProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Delete category
    [deleteProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProductDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productDetails = state.productDetails.filter(
        (productDetail) => productDetail.id !== action.payload
      );
    },
    [deleteProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Update product detail
    [updateProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProductDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productDetails = state.productDetails.map((productDetail) => {
        return productDetail.id === action.payload.id
          ? action.payload
          : productDetail;
      });
    },
    [updateProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productDetailsSlice.reducer;
