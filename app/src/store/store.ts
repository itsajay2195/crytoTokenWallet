// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import walletReducer from "./slices/walletSlice";
import sendTokenReducer from "./slices/sendTokenSlice";
import transactions from "./slices/transactionHistorySlice";
import tokens from "./slices/tokensSlice";
import ercTokens from "./slices/sendErcTokenSlice";
// const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    wallet: walletReducer,
    sendToken: sendTokenReducer,
    transactions: transactions,
    tokens: tokens,
    ercTokens: ercTokens,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
});

// sagaMiddleware.run(rootSaga);

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
