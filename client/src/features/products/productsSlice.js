import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/categories/${categoryId}/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ categoryId, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        `/categories/${categoryId}/products`,
        values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ categoryId, id }, { rejectWithValue }) => {
    try {
      await API.delete(`/categories/${categoryId}/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ categoryId, id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(
        `/categories/${categoryId}/products/${id}`,
        values
      );
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    //  Get products
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

    //  Add product
    [addProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Delete product
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Update product
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = state.products.map((product) => {
        return product.id === action.payload.id ? action.payload : product;
      });
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
