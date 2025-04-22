import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  walletData: any;
  loading: boolean;
}

const initialState: UIState = {
  walletData: [],
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateWalletData: (state, action) => {
      state.walletData = action.payload;
    },
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { updateWalletData, showLoader, hideLoader } = uiSlice.actions;

export default uiSlice.reducer;
