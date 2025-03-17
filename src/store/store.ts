import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import { searchTermSlice } from "./slices/searchTermSlice";
import { priceSlice } from "./slices/priceSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    searchTerm: searchTermSlice.reducer,
    price: priceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
