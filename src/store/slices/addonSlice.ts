import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";
import { Addon } from "@prisma/client";
import {
  AddonSliceType,
  CreateAddonParam,
  DeleteAddonParam,
  UpdateAddonParam,
} from "@/types/addon";

// Initial state
const initialState: AddonSliceType = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addonSlice/createAddon",
  async (newAddonCategoryParam: CreateAddonParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newAddonCategoryParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/addon`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();

    const { addon } = dataFromServer;
    thunkApi.dispatch(addAddon(addon));
    onSuccess && onSuccess();
  }
);

export const updateAddon = createAsyncThunk(
  "addonSlice/updateAddon",
  async (updateAddonParam: UpdateAddonParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateAddonParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/addon`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { addon } = dataFromServer;
    thunkApi.dispatch(replaceAddon(addon));
  }
);
export const deleteAddon = createAsyncThunk(
  "addonSlice/deleteAddon",
  async (deleteTableParam: DeleteAddonParam, thunkApi) => {
    const { onSuccess, onError, id } = deleteTableParam;
    await fetch(`${config.backOfficeAppApiBaseUrl}/addon?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeAddon(id));
  }
);

export const addonSlice = createSlice({
  name: "addonSlice",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
      state.isLoading = true;
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

// Export actions
export const { setAddons, addAddon, replaceAddon, removeAddon } =
  addonSlice.actions;

// Export reducer
export default addonSlice.reducer;
