import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseOptionFunType } from "../../types/baseOption";
import { MenuCategorySliceType, MenuCategoryType } from "@/types/menuCategory";
import { config } from "@/config";
import { MenuCategory } from "@prisma/client";

// Initial state
const initialState: MenuCategorySliceType = {
  menuCategories: [],
  isLoading: false,
  error: null,
};
interface NewMenuCategoryParam extends MenuCategoryType, BaseOptionFunType {}

export const createMenuCategory = createAsyncThunk(
  "menuCategorySlice/createMenuCategory",
  async (newMenuCategoryParam: NewMenuCategoryParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newMenuCategoryParam;
    console.log(payload);

    /* onError && onError();
    throw new Error("ddj"); */

    const response = await fetch(
      `${config.backOfficeAppApiBaseUrl}/menu-category`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();

    const { menuCategory } = dataFromServer;
    thunkApi.dispatch(addMenuCategories(menuCategory));
  }
);

export const menuCategorySlice = createSlice({
  name: "menuCategorySlice",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },
    addMenuCategories: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
      state.isLoading = true;
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },
  },
});

// Export actions
export const { setMenuCategories, addMenuCategories } =
  menuCategorySlice.actions;

// Export reducer
export default menuCategorySlice.reducer;
