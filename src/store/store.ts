import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./slices/menuSlice";
import appSnackbarReducer from "./slices/appSnackbarSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
// ...

export const store = configureStore({
  reducer: {
    menus: menuSliceReducer,
    menuCategories: menuCategoryReducer,
    appSnackBar: appSnackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
