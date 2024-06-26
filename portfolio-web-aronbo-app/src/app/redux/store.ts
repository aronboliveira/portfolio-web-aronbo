import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./slices/routerSlice";

export const store = configureStore({
  reducer: {
    router: routerReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    router: {
      pathname: "",
      query: {},
      asPath: "",
    },
  },
  /* middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(loggerMiddleware), */
  // enhancers: [enhancer1, enhancer2],
});

export default store;
