import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./slices/menuSlice";
import appSnackbarReducer from "./slices/appSnackbarSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import companyReducer from "./slices/companySlice";
import locationReducer from "./slices/locationSlice";
import appReducer from "./slices/appSlice";
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice";
import disableLocationMenuCategoryReducer from "./slices/disableLocationMenuCategorySlice";
import disableLocationMenuReducer from "./slices/disableLocationMenuSlice";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import tableReducer from "./slices/tablesSlice";
import menuAddonCategoryReducer from "./slices/menuAddonCategorySlice";
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    appSnackBar: appSnackbarReducer,

    company: companyReducer,
    menus: menuSliceReducer,
    menuCategories: menuCategoryReducer,
    locations: locationReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    table: tableReducer,

    menuCategoryMenu: menuCategoryMenuReducer,
    menuAddonCategory: menuAddonCategoryReducer,

    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    disableLocationMenu: disableLocationMenuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
