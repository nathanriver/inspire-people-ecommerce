import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getBanners = createAsyncThunk("banners/getBanners", async () => {
  const { data } = await API.get("/banners");
  return data;
});

const initialState = {
  banners: [],
  status: null,
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  extraReducers: {
    [getBanners.pending]: (state) => {
      state.status = "loading";
    },
    [getBanners.fulfilled]: (state, action) => {
      state.status = "success";
      state.banners = action.payload;
    },
    [getBanners.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default bannersSlice.reducer;
