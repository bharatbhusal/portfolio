import React, { useEffect } from "react";
import IMAGE from "./assets/bharatbhusal.jpeg"; // Ensure this image path is correct
import ThemeSwitcher from "./components/ThemeSwitcher";
import SocialLinks from "./components/SocialLinks";
import useTheme from "./hooks/useTheme";
import Explore from "./components/Explore";
import { Outlet } from "react-router-dom";

function App() {
	const { darkMode } = useTheme(); // Get the darkMode state from the hook

	// Effect to apply body classes based on darkMode
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
			className={`min-h-screen p-5 flex flex-col items-center justify-center transition-colors duration-300 ${
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
