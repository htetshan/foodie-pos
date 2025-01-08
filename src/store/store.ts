import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./slices/menuSlice";
import appSnackbarReducer from "./slices/appSnackbarSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import companyReducer from "./slices/companySlice";
import appReducer from "./slices/appSlice";
// ...

export const store = configureStore({
  reducer: {
    app: appReducer,
    menus: menuSliceReducer,
    menuCategories: menuCategoryReducer,
    company: companyReducer,
    appSnackBar: appSnackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
