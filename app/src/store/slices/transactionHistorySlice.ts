import { createSlice } from "@reduxjs/toolkit";

interface TransactionSlice {
  isLoading: boolean;
  transactionHistory: any[] | null;
}

const initialState: TransactionSlice = {
  isLoading: false,
  transactionHistory: [],
};

const uiSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    showTransactionLoader: (state) => {
      state.isLoading = true;
    },
    hideTransactionLoader: (state) => {
      state.isLoading = false;
    },
    setTransactions: (state, action) => {
      state.transactionHistory = action.payload;
    },
  },
});

export const { showTransactionLoader, hideTransactionLoader, setTransactions } =
  uiSlice.actions;

export default uiSlice.reducer;
