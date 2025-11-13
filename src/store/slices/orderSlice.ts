import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";

export interface OrderSlice {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
}
// Initial state
const initialState: OrderSlice = {
  orders: [],
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

// Export actions
export const { setLoading, setOrders } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
