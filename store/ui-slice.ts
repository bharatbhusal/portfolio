import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  adminNavExpanded: boolean;
  theme: "light" | "dark";
}

const initialState: UiState = {
  adminNavExpanded: false,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleAdminNav(state) {
      state.adminNavExpanded = !state.adminNavExpanded;
    },
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
  },
});

export const { toggleAdminNav, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
