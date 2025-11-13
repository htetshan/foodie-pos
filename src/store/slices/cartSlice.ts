import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addon, Menu } from "@prisma/client";

export interface CartItem {
  id: number;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
// Initial state
const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (exist) {
        state.items = state.items.filter((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      /*   state.items=> 1,2,4 and action.pay.id=4  1!==4(true)filter take , 4!==4(false)filter no take [in addonSlice difference ways have]*/
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
