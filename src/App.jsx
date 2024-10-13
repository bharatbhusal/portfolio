import React, { useEffect } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useTheme from "./hooks/useTheme";
import Explore from "./components/Explore";
import { Outlet } from "react-router-dom";

function App() {
	const { darkMode } = useTheme();

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("bg-gray-900", "text-white");
			document.body.classList.remove(
				"bg-gray-100",
				"text-black"
			);
		} else {
			document.body.classList.add("bg-gray-100", "text-black");
			document.body.classList.remove(
				"bg-gray-900",
				"text-white"
			);
		}
	}, [darkMode]);

	return (
		<div
			className={`p-5 min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
				darkMode
					? "bg-[#1a1a1a] text-white"
					: "bg-gray-100 text-black"
			}`}
		>
			<Explore />
			<Outlet />
			<ThemeSwitcher />
		</div>
	);
}

export default App;
