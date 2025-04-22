import { createSlice } from "@reduxjs/toolkit";

interface ERCSlice {
  isLoading: boolean;
  amount: number;
  tokenInfo: any;
  toAddress: string | null;
}

const initialState = {
  isLoading: false,
  amount: 0,
  toAddress: "",
  tokenInfo: "",
};

const sendErcTokenSlice = createSlice({
  name: "sendErc",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setToAddress: (state, action) => {
      state.toAddress = action.payload;
    },
    setTokenInfo: (state, action) => {
      state.tokenInfo = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setToAddress, setAmount, setTokenInfo } =
  sendErcTokenSlice.actions;

export default sendErcTokenSlice.reducer;
