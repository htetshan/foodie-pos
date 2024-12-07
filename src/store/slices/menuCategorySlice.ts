import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseOptionFunType } from "../../types/baseOption";
import { MenuCategorySliceType, MenuCategoryType } from "@/types/menuCategory";

// Initial state
const initialState: MenuCategorySliceType = {
  menuCategory: [],
  isLoading: false,
  error: null,
};
interface NewMenuCategoryParam extends MenuCategoryType, BaseOptionFunType {}

export const createMenuCategory = createAsyncThunk(
  "menuCategorySlice/createMenuCategory",
  async (newMenuCategoryParam: NewMenuCategoryParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newMenuCategoryParam;
    /* onError && onError();
    throw new Error("ddj"); */

    const response = await fetch(
      "http://localhost:3000/api/backofficeserver/menu-category",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();

    const { menuCategory } = dataFromServer;

    onSuccess && onSuccess();
    return menuCategory;
  }
);

export const menuCategorySlice = createSlice({
  name: "menuCategorySlice",
  initialState,
  reducers: {
    setMenuCategory: (state, action: PayloadAction<MenuCategoryType[]>) => {
      state.menuCategory = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategoryType>) => {
      state.menuCategory = [...state.menuCategory, action.payload];
      state.isLoading = true;
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategoryType[]>) => {
      state.menuCategory = action.payload;
    },
  },
});

// Export actions
export const { setMenuCategory, addMenuCategory } = menuCategorySlice.actions;

// Export reducer
export default menuCategorySlice.reducer;
