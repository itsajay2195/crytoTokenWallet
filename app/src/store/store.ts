// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";

// const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
});

// sagaMiddleware.run(rootSaga);

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
