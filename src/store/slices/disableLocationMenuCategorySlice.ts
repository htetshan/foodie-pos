import { DisableLocationMenuCategory } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//type
interface DisableLocationMenuCategorySlice {
  disableLocationMenuCategories: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
// Initial state
const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  error: null,
};

export const disableLocationMenuCategorySlice = createSlice({
  name: "disableLocationMenuCategorySlice",
  initialState,
  reducers: {
    setDisableLocationMenuCategory: (
      state,
      action: PayloadAction<DisableLocationMenuCategory[]>
    ) => {
      state.disableLocationMenuCategories = action.payload;
    },
  },
});

// Export actions
export const { setDisableLocationMenuCategory } =
  disableLocationMenuCategorySlice.actions;

// Export reducer
export default disableLocationMenuCategorySlice.reducer;
