import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RouterState } from "../../lib/declarations/interfaces";

export const routerSlice = createSlice({
  name: "router",
  initialState: { pathname: "", query: {}, asPath: "" } as RouterState,
  reducers: {
    setRouter(state, action: PayloadAction<Partial<RouterState>>) {
      state.pathname = action.payload.pathname || state.pathname;
      state.query = action.payload.query || state.query;
      state.asPath = action.payload.asPath || state.asPath;
    },
  },
  /* extraReducers: (builder) => {
    builder.addCase('someAction', (s, a) => {
      s.value = a.payload;
    });
  } */
});
export const { setRouter } = routerSlice.actions;
export default routerSlice.reducer;
