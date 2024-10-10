import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: true, // Default theme
	},
	reducers: {
		toggleTheme(state) {
			state.darkMode = !state.darkMode;
			localStorage.setItem(
				"theme",
				state.darkMode ? "dark" : "light"
			);
		},
		setTheme(state, action) {
			state.darkMode = action.payload === "dark";
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectDarkMode = (state) =>
	state.theme.darkMode;

export default themeSlice.reducer;
