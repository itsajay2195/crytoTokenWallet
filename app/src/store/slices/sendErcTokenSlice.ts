import { createSlice } from "@reduxjs/toolkit";

interface ERCSlice {
  isLoading: boolean;
  amount: number;
  toAddress: string | null;
}

const initialState = {
  isLoading: false,
  amount: 0,
  toAddress: "",
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
  },
});

export const { showLoader, hideLoader, setToAddress, setAmount } =
  sendErcTokenSlice.actions;

export default sendErcTokenSlice.reducer;
