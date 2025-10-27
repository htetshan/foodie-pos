import { MenuAddonCategorySliceType } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//type

// Initial state
const initialState: MenuAddonCategorySliceType = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategorySlice",
  initialState,
  reducers: {
    setMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
  },
});

// Export actions
export const { setMenuAddonCategory } = menuAddonCategorySlice.actions;

// Export reducer
export default menuAddonCategorySlice.reducer;
