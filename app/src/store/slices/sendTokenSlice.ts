import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  privateKey: string | null;
  amount: number;
  toAddress: string | null;
}

const initialState: UIState = {
  isLoading: false,
  privateKey: null,
  amount: 0,
  toAddress: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setPrivateKey: (state, action) => {
      state.privateKey = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setToAddress: (state, action) => {
      state.toAddress = action.payload;
    },
  },
});

export const {
  showLoader,
  hideLoader,
  setToAddress,
  setPrivateKey,
  setAmount,
} = uiSlice.actions;

export default uiSlice.reducer;
