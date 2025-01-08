import { Company } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface companySliceType {
  company: Company | null;
  isLoading: boolean;
  error: Error | null;
}
const initialState: companySliceType = {
  company: null,
  isLoading: false,
  error: null,
};

export const compnaySlice = createSlice({
  name: "compnaySlice",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

// Export actions
export const { setCompany } = compnaySlice.actions;

// Export reducer
export default compnaySlice.reducer;
