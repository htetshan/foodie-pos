import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySliceType {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
