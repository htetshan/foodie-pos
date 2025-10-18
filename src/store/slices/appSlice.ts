import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setLocations } from "./locationSlice";
import { Location } from "@prisma/client";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategorySlice";
import { setDisableLocationMenu } from "./disableLocationMenuSlice";

// Initial state
interface AppSliceType {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}
const initialState: AppSliceType = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const appFetchServer = createAsyncThunk(
  "appSlice/appFetchServer",
  async (_, thunkApi) => {
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/app`);
    const dataFromServer = await response.json();
    const {
      menus,
      menuCategories,
      company,
      menuCategoryMenus,
      locations,
      disableLocationMenuCategories,
      disableLocationMenus,
    } = dataFromServer;
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    thunkApi.dispatch(setLocations(locations));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setInit(true));

    thunkApi.dispatch(
      setDisableLocationMenuCategory(disableLocationMenuCategories)
    );
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenus));

    const getSelectedLocation = localStorage.getItem("selectedLocationId");
    if (getSelectedLocation) {
      const selectedLocation = locations.find(
        (item: any) => item.id === Number(getSelectedLocation)
      );
      thunkApi.dispatch(setSelectedLocation(selectedLocation));
    }
  }
);

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
  },
});

// Export actions
export const { setInit, setSelectedLocation } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
