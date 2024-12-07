export interface MenuCategoryType {
  name: string;
  isAvailable: boolean;
}

export interface MenuCategorySliceType {
  menuCategory: MenuCategoryType[];
  isLoading: boolean;
  error: string | null;
}
