import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  walletData: any;
}

const initialState: UIState = {
  walletData: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateWalletData: (state, action) => {
      state.walletData = action.payload;
    },
  },
});

export const { updateWalletData } = uiSlice.actions;

export default uiSlice.reducer;
