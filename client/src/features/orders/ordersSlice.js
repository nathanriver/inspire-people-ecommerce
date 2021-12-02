import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/orders`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/orders/${id}`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  orders: [],
  isLoading: true,
  error: null,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: {
    //  Get orders
    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //  Update order
    [updateOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.map((order) => {
        return order.id === action.payload.id ? action.payload : order;
      });
    },
    [updateOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ordersSlice.reducer;
