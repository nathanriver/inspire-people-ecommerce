import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getUserAddresses = createAsyncThunk(
  "address/getUserAddresses",
  async () => {
    const { data } = await API.get("/addresses");
    return data;
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/addresses", addressData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/addresses/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/addresses/${id}`, updateData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  addresses: [],
  isLoading: true,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: {
    //  Get user addresses
    [getUserAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload;
    },
    [getUserAddresses.rejected]: (state) => {
      state.isLoading = false;
    },

    //  Add address
    [addAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [addAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload;
    },
    [addAddress.rejected]: (state) => {
      state.isLoading = false;
    },

    //  Delete address
    [deleteAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.uuid !== action.payload
      );
      state.isLoading = false;
    },
    [deleteAddress.rejected]: (state) => {
      state.isLoading = false;
    },

    //  Update address
    [updateAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload;
    },
    [updateAddress.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default addressSlice.reducer;
