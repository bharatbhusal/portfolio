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
			className={`h-screen grid grid-rows-[10%_80%_10%] transition-colors duration-300 ${
				darkMode
					? "bg-[#1a1a1a] text-white"
					: "bg-gray-100 text-black"
			} `}
		>
			<div className="flex items-center">
				<div className="flex-grow text-center"></div>
				<div className="w-1/10 text-center">
					<Explore />
				</div>
			</div>

			<div className="flex items-center justify-center">
				<div className="text-2xl overflow-y-auto">
					<Outlet />
				</div>
			</div>

			<div className="flex items-center">
				<div className="flex-grow text-center"></div>
				<div className="w-1/10 text-center">
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	);
}

export default App;
