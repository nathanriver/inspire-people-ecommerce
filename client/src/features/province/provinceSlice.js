import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getProvinces = createAsyncThunk(
  "province/getProvinces",
  async () => {
    const { data } = await API.get("/provinces");
    return data;
  }
);

const initialState = {
  provinces: [],
  isLoading: false,
  error: null,
};

const provinceSlice = createSlice({
  name: "province",
  initialState,
  extraReducers: {
    [getProvinces.pending]: (state) => {
      state.isLoading = true;
    },
    [getProvinces.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.provinces = action.payload;
    },
    [getProvinces.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default provinceSlice.reducer;
