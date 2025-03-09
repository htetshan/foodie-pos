import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSliceType, MenuType } from "../../types/menu";
import { BaseOptionFunType } from "../../types/baseOption";
import { Menu } from "@prisma/client";

// Initial state
const initialState: MenuSliceType = {
  menus: [],
  isLoading: false,
  error: null,
};
interface NewMenuParamType extends MenuType, BaseOptionFunType {}

export const createMenu = createAsyncThunk(
  "menuSlice/createMenu",
  async (newMenuParam: NewMenuParamType, thunkApi) => {
    const { onSuccess, onError, ...payload } = newMenuParam;
    /* onError && onError();
    throw new Error("ddj"); */

    const response = await fetch(
      "http://localhost:3000/api/backofficeserver/menu",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();

    const { menu, menuCategoryMenu } = dataFromServer;
    console.log("menu now is :", menu);
    console.log("menuCategoryMenu is now:", menuCategoryMenu);

    //thunkApi.dispatch(addMenu(menu));
    onSuccess && onSuccess();
    return menu;
    // thunkApi.dispatch(setMenu(dataFromServer)); //server res all menus[]... So setMenu()=> state.menu= action.payload<all menus[]>
  }
);

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
      state.isLoading = true;
    },
    removeMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menus = [...state.menus, action.payload];
        state.isLoading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create menu";
      });
  },
});

// Export actions
export const { setMenu, addMenu } = menuSlice.actions;

// Export reducer
export default menuSlice.reducer;
