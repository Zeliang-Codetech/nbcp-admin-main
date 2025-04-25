import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, authApiSlice } from "./slices/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import appReducer from "./slices/appSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
