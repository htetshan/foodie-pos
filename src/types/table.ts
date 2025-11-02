import { Table } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface TableSliceType {
  tables: Table[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateTableParam extends BaseOptionFunType {
  name: string;
  locationId?: number;
}
export interface UpdateTableParam extends Table, BaseOptionFunType {}

export interface DeleteTableParam extends BaseOptionFunType {
  id: number;
}
