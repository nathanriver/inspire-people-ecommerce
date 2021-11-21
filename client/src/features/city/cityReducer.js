import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getCities = createAsyncThunk(
  "city/getCities",
  async (provinceId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/cities?province_id=${provinceId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  extraReducers: {
    [getCities.pending]: (state) => {
      state.isLoading = true;
    },
    [getCities.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cities = action.payload;
    },
    [getCities.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default citySlice.reducer;
