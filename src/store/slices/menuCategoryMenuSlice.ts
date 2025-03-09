import { MenuCategoryMenu } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//type
interface MenuCategoryMenuSliceType {
  menuCategoryMenus: MenuCategoryMenu[];
  isLoading: boolean;
  error: Error | null;
}
// Initial state
const initialState: MenuCategoryMenuSliceType = {
  menuCategoryMenus: [],
  isLoading: false,
  error: null,
};

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenuSlice",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.menuCategoryMenus = action.payload;
    },
  },
});

// Export actions
export const { setMenuCategoryMenu } = menuCategoryMenuSlice.actions;

// Export reducer
export default menuCategoryMenuSlice.reducer;
