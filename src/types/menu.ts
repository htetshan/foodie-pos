import { Menu } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface NewMenuPayload {
  name: string;
  price: number;
  menuCategoryIds: number[];
}
export interface MenuSliceType {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}
export interface UpdateMenuType extends Menu, BaseOptionFunType {
  selectedLocationId?: number;
  isAvailable?: boolean;
  menuCategoryIds?: number[];
}
