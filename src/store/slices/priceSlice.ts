import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { min: number; max: number } = {
  min: 0,
  max: 100,
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setMin: (state, action: PayloadAction<number>) => {
      state.min = action.payload;
    },
    setMax: (state, action: PayloadAction<number>) => {
      state.max = action.payload;
    },
  },
});

export const { setMin, setMax } = priceSlice.actions;
export default priceSlice.reducer;
