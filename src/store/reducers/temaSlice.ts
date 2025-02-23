// themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../tema";

interface ThemeState {
  mode: Mode;
}

const initialState: ThemeState = {
  mode: "dark", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleColorMode } = themeSlice.actions;
export default themeSlice.reducer;
