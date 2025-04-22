import { createSlice } from "@reduxjs/toolkit";

interface TokensSlice {
  isLoading: boolean;
  tokens: any[] | null;
}

const initialState: TokensSlice = {
  isLoading: false,
  tokens: [],
};

const uiSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    showTransactionLoader: (state) => {
      state.isLoading = true;
    },
    hideTransactionLoader: (state) => {
      state.isLoading = false;
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export const { showTransactionLoader, hideTransactionLoader, setTokens } =
  uiSlice.actions;

export default uiSlice.reducer;
