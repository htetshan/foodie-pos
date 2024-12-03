export interface MenuType {
  name: string;
  price: number;
}

export interface MenuSliceType {
  menu: MenuType[];
  isLoading: boolean;
  error: string | null;
}
