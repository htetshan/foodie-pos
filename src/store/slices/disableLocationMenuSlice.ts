import { DisableLocationMenu } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//type
interface DisableLocationMenuSlice {
  disableLocationMenus: DisableLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
// Initial state
const initialState: DisableLocationMenuSlice = {
  disableLocationMenus: [],
  isLoading: false,
  error: null,
};

export const disableLocationMenuSlice = createSlice({
  name: "disableLocationMenySlice",
  initialState,
  reducers: {
    setDisableLocationMenu: (
      state,
      action: PayloadAction<DisableLocationMenu[]>
    ) => {
      state.disableLocationMenus = action.payload;
    },
  },
});

// Export actions
export const { setDisableLocationMenu } = disableLocationMenuSlice.actions;

// Export reducer
export default disableLocationMenuSlice.reducer;
