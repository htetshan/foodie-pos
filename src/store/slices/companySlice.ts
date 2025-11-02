import { config } from "@/config";
import { UpdateCompanyParam } from "@/types/company";
import { Company } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
export const updateCompany = createAsyncThunk(
  "addonSlice/updateCompany",
  async (updateCompanyParam: UpdateCompanyParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateCompanyParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/setting`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { company } = dataFromServer;
    thunkApi.dispatch(setCompany(company));
  }
);
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
export const selectedCompanySetting = (state: RootState) =>
  state.company.company;
