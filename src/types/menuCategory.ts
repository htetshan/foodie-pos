import { MenuCategory } from "@prisma/client";

export interface MenuCategoryType {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}

export interface MenuCategorySliceType {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  error: string | null;
}
export interface UpdateMenuCategoryType {
  name: string;
  isAvailable: boolean;
}
