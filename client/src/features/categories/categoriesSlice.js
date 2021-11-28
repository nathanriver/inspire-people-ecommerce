import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/categories`, categoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await API.put(
        `/categories/${categoryData.id}`,
        categoryData.values
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  categories: [],
  isLoading: true,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    //  Get categories
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Add category
    [addCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories.push(action.payload);
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Delete category
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Update category
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.map((category) => {
        return category.id === action.payload.id ? action.payload : category;
      });
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
