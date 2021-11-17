import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  message: null,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
