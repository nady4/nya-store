import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [] as string[],
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((id) => id !== action.payload);
    },
    initializeCart: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { addToCart, removeFromCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;
