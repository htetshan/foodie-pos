import { MenuCategory } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface MenuCategoryType extends Partial<MenuCategory> {
  isAvailable?: boolean;
}

export interface MenuCategorySliceType {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  error: string | null;
}
export interface UpdateMenuCategoryType extends BaseOptionFunType {
  name?: string;
  isAvailable?: boolean;
  selectedLocationId?: number;
}
