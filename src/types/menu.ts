import { Menu } from "@prisma/client";

export interface MenuType {
  name: string;
  price: number;
  menuCategoryIds: number[];
}
export interface MenuSliceType {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}
