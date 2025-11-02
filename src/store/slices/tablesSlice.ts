import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "@/config";
import { Table } from "@prisma/client";
import {
  CreateTableParam,
  DeleteTableParam,
  TableSliceType,
  UpdateTableParam,
} from "@/types/table";

// Initial state
const initialState: TableSliceType = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "tableSlice/createTable",
  async (newTable: CreateTableParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = newTable;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/table`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();

    const { table } = dataFromServer;
    thunkApi.dispatch(addTable(table));
    onSuccess && onSuccess();
  }
);

export const updateTable = createAsyncThunk(
  "tableSlice/updateTable",
  async (updateTableParam: UpdateTableParam, thunkApi) => {
    const { onSuccess, onError, ...payload } = updateTableParam;
    const response = await fetch(`${config.backOfficeAppApiBaseUrl}/table`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { table } = dataFromServer;
    thunkApi.dispatch(replaceTable(table));
  }
);
export const deleteTable = createAsyncThunk(
  "tableSlice/deleteTable",
  async (deleteTableParam: DeleteTableParam, thunkApi) => {
    const { onSuccess, onError, id } = deleteTableParam;
    await fetch(`${config.backOfficeAppApiBaseUrl}/table?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeTable(id));
  }
);

export const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
      state.isLoading = true;
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

// Export actions
export const { setTables, addTable, replaceTable, removeTable } =
  tableSlice.actions;

// Export reducer
export default tableSlice.reducer;
