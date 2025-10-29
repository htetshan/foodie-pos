import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";
import { AddonCategory } from "@prisma/client";
import {
  AddonCategorySliceType,
  CreateAddonCategoryParam,
  DeleteAddonCategoryParam,
  UpdateAddonCategoryParam,
} from "@/types/addonCategory";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";

// Initial state
const initialState: AddonCategorySliceType = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategorySlice/createAddonCategory",
  async (newAddonCategoryParam: CreateAddonCategoryParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newAddonCategoryParam;
    const response = await fetch(
      `${config.backOfficeAppApiBaseUrl}/addon-category`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();

    const { addonCategory, menuAddonCategories } = dataFromServer;
    thunkApi.dispatch(addAddonCategory(addonCategory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    onSuccess && onSuccess();
  }
);

export const updateAddonCategory = createAsyncThunk(
  "addonCategorySlice/updateAddonCategory",
  async (updateAddonCategoryParam: UpdateAddonCategoryParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateAddonCategoryParam;
    const response = await fetch(
      `${config.backOfficeAppApiBaseUrl}/addon-category`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload }),
      }
    );
    const dataFromServer = await response.json();
    const { addonCategory, menuAddonCategories } = dataFromServer;
    thunkApi.dispatch(replaceAddonCategory(addonCategory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
  }
);
export const deleteAddonCategory = createAsyncThunk(
  "addonCategorySlice/deleteAddonCategory",
  async (deleteMenuCategoryParam: DeleteAddonCategoryParam, thunkApi) => {
    const { onSuccess, onError, id } = deleteMenuCategoryParam;
    await fetch(`${config.backOfficeAppApiBaseUrl}/addon-category?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeAddonCategory(id));
  }
);

export const addonCategorySlice = createSlice({
  name: "addonCategorySlice",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
      state.isLoading = true;
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

// Export actions
export const {
  setAddonCategories,
  addAddonCategory,
  replaceAddonCategory,
  removeAddonCategory,
} = addonCategorySlice.actions;

// Export reducer
export default addonCategorySlice.reducer;
