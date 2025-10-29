import { Addon } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface AddonSliceType {
  addons: Addon[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateAddonParam extends BaseOptionFunType {
  name: string;
  price: number;
  addonCategoryId?: number;
}
export interface UpdateAddonParam extends Addon, BaseOptionFunType {}

export interface DeleteAddonParam extends BaseOptionFunType {
  id: number;
}
