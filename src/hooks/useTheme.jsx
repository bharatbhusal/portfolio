import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleTheme,
	setTheme,
	selectDarkMode,
} from "../store/themeSlice";

const useTheme = () => {
	const dispatch = useDispatch();
	const darkMode = useSelector(selectDarkMode);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			dispatch(setTheme(savedTheme));
		}
	}, [dispatch]);

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	return { darkMode, toggleTheme: handleToggleTheme };
};

export default useTheme;
