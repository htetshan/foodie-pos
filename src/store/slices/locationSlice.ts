import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseOptionFunType } from "../../types/baseOption";
import { config } from "@/config";
import { Location } from "@prisma/client";
import { LocationSliceType, LocationType } from "@/types/location";

// Initial state
const initialState: LocationSliceType = {
  locations: [],
  isLoading: false,
  error: null,
};
export interface NewLocationParam extends LocationType, BaseOptionFunType {}
export interface DeleLocationParam extends BaseOptionFunType {
  id: number;
}
export const createLocation = createAsyncThunk(
  "locationSlice/createLocation",
  async (newLocationParam: NewLocationParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newLocationParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/location`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();

    const { location } = dataFromServer;
    thunkApi.dispatch(addLocaton(location));
    //thunkApi.dispatch(addLocaton(menuCategory));
  }
);

export const updateLocation = createAsyncThunk(
  "locationSlice/updateLocation",
  async (updateLocationParam: NewLocationParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateLocationParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/location`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { location } = dataFromServer;
    thunkApi.dispatch(editLocation(location));
  }
);
export const deleteLocation = createAsyncThunk(
  "locationSlice/deleteLocation",
  async (deleteMenuCategoryParam: DeleLocationParam, thunkApi) => {
    const { onSuccess, onError, id } = deleteMenuCategoryParam;
    await fetch(`${config.backOfficeAppApiBaseUrl}/location?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeLocation(id));
  }
);

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocaton: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
      state.isLoading = true;
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    editLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

// Export actions
export const { setLocations, addLocaton, editLocation, removeLocation } =
  locationSlice.actions;

// Export reducer
export default locationSlice.reducer;
