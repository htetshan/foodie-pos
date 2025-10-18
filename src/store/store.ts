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
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    menus: menuSliceReducer,
    menuCategories: menuCategoryReducer,
    locations: locationReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    company: companyReducer,
    appSnackBar: appSnackbarReducer,
    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    disableLocationMenu: disableLocationMenuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
