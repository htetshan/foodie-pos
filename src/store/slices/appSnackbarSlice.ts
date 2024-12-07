import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type outComeValue = "success" | "error"; // type alias

// Define slice state type
interface SnackbarSlice {
  openType?: boolean;
  outComeType?: outComeValue;
  message: string;
}

// Initial state
const initialState: SnackbarSlice = {
  openType: false,
  outComeType: "success",
  message: "",
};

export const appSnackbarSlice = createSlice({
  name: "appSnack",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarSlice>) => {
      const { openType, outComeType, message } = action.payload;
      state.openType = openType;
      state.outComeType = outComeType;
      state.message = message;
    },
    hideSnackbar: (state) => {
      state.openType = false;
      state.outComeType = "success";
      state.message = "";
    },
  },
});

// Export actions
export const { setSnackbar, hideSnackbar } = appSnackbarSlice.actions;

// Export reducer
export default appSnackbarSlice.reducer;
