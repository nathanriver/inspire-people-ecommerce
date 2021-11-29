import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getBanners = createAsyncThunk(
  "banners/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/banners`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const toggleActiveBanner = createAsyncThunk(
  "banners/toggleActiveBanner",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/banners/${id}/active`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addBanner = createAsyncThunk(
  "banners/addBanner",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/banners`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/banners/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  banners: [],
  isLoading: true,
  error: null,
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  extraReducers: {
    //  Get categories
    [getBanners.pending]: (state) => {
      state.isLoading = true;
    },
    [getBanners.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.banners = action.payload;
    },
    [getBanners.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Toggle active banner
    [toggleActiveBanner.pending]: (state) => {
      state.isLoading = true;
    },
    [toggleActiveBanner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.banners = state.banners.map((banner) => {
        return banner.id === action.payload.id ? action.payload : banner;
      });
    },
    [toggleActiveBanner.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Add banner
    [addBanner.pending]: (state) => {
      state.isLoading = true;
    },
    [addBanner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.banners.push(action.payload);
    },
    [addBanner.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Delete banner
    [deleteBanner.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBanner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.banners = state.banners.filter(
        (banner) => banner.id !== action.payload
      );
    },
    [deleteBanner.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bannersSlice.reducer;
