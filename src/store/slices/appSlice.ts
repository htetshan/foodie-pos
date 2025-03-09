import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";

// Initial state
interface AppSliceType {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
}
const initialState: AppSliceType = {
  init: false,
  isLoading: false,
  error: null,
};

export const appFetchServer = createAsyncThunk(
  "appSlice/appFetchServer",
  async (_, thunkApi) => {
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/app`);
    const dataFromServer = await response.json();
    const { menus, menuCategories, company, menuCategoryMenus } =
      dataFromServer;
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setInit(true));
  }
);

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

// Export actions
export const { setInit } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
