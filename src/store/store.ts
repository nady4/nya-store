import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
  // This disables Redux Toolkit's serialization check for server components
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
