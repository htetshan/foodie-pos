import { AddonCategory } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface AddonCategorySliceType {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  error: string | null;
}

export interface NewAddonCategoryParam
  extends AddonCategory,
    BaseOptionFunType {
  menuIds?: number[];
}
export interface CreateAddonCategoryParam extends BaseOptionFunType {
  name: string;
  isRequired: boolean;
  menuIds: number[];
}
export interface UpdateAddonCategoryParam
  extends AddonCategory,
    BaseOptionFunType {
  menuIds: number[];
  companyId?: number; //menuAddonCategory table want to find related menu and addonCategory
}

export interface DeleteAddonCategoryParam extends BaseOptionFunType {
  id: number;
}
