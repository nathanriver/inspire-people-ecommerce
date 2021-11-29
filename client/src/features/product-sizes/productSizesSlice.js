import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getProductSizes = createAsyncThunk(
  "productSizes/getproductSizes",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/categories/${categoryId}/product-sizes`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addProductSize = createAsyncThunk(
  "productSizes/addProductSize",
  async ({ categoryId, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        `/categories/${categoryId}/product-sizes`,
        values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProductSize = createAsyncThunk(
  "productSizes/deleteProductSize",
  async ({ categoryId, id }, { rejectWithValue }) => {
    try {
      await API.delete(`/categories/${categoryId}/product-sizes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProductSize = createAsyncThunk(
  "productSizes/updateProductSize",
  async ({ categoryId, id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(
        `/categories/${categoryId}/product-sizes/${id}`,
        values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  productSizes: [],
  isLoading: true,
  error: null,
};

const productSizesSlice = createSlice({
  name: "productSizes",
  initialState,
  extraReducers: {
    //  Get categories
    [getProductSizes.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductSizes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productSizes = action.payload;
    },
    [getProductSizes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Add category
    [addProductSize.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductSize.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productSizes.push(action.payload);
    },
    [addProductSize.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Delete category
    [deleteProductSize.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProductSize.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productSizes = state.productSizes.filter(
        (productSize) => productSize.id !== action.payload
      );
    },
    [deleteProductSize.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Update category
    [updateProductSize.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProductSize.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productSizes = state.productSizes.map((productSize) => {
        return productSize.id === action.payload.id
          ? action.payload
          : productSize;
      });
    },
    [updateProductSize.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productSizesSlice.reducer;
