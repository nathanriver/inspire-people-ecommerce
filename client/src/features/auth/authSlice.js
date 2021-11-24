import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, setToken } from "../../config";

export const register = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/register", registerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "auth/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.token ? JSON.parse(localStorage.token) : null;
      setToken(token);
      const { data } = await API.post("/validate");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: true,
  loginError: null,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: {
    // Register
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.registerError = null;
      state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      setToken(action.payload.token);
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.registerError = action.payload;
    },

    // Login
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginError = null;
      state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      setToken(action.payload.token);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
    },

    // Auto Login
    [autoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [autoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [autoLogin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
