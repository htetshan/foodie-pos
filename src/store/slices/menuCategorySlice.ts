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
export interface NewMenuCategoryParam
  extends MenuCategoryType,
    BaseOptionFunType {}
export interface DeleMenuCategoryParam extends BaseOptionFunType {
  id: number;
}
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

export const updateMenuCategory = createAsyncThunk(
  "menuCategorySlice/updateMenuCategory",
  async (updateMenuCategoryParam: NewMenuCategoryParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateMenuCategoryParam;
    const response = await fetch(
      `${config.backOfficeAppApiBaseUrl}/menu-category`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();
    const { updateMenuCategory } = dataFromServer;
    thunkApi.dispatch(editMenuCategory(updateMenuCategory));
  }
);
export const deleteMenuCategory = createAsyncThunk(
  "menuCategorySlice/deleteMenuCategory",
  async (deleteMenuCategoryParam: DeleMenuCategoryParam, thunkApi) => {
    const { onSuccess, onError, id } = deleteMenuCategoryParam;
    await fetch(`${config.backOfficeAppApiBaseUrl}/menu-category?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeMenuCategory(id));
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
    removeMenuCategory: (state, action: PayloadAction<number>) => {
      state.menuCategories = state.menuCategories.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    editMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

// Export actions
export const {
  setMenuCategories,
  addMenuCategories,
  editMenuCategory,
  removeMenuCategory,
} = menuCategorySlice.actions;

// Export reducer
export default menuCategorySlice.reducer;
