import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderType } from "@/types";

export const OrdersSlice = createSlice({
  name: "Orders",
  initialState: [] as OrderType[],
  reducers: {
    setOrders: (state, action: PayloadAction<OrderType[]>) => {
      return [...action.payload];
    },
  },
});

export const { setOrders } = OrdersSlice.actions;
export default OrdersSlice.reducer;
