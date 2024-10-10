import React from "react";
import { VscColorMode } from "react-icons/vsc";
import useTheme from "../hooks/useTheme";

function ThemeSwitcher() {
	const { toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-5 right-5 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
		>
			<VscColorMode className="text-xl hover:text-green-400" />
		</button>
	);
}

export default ThemeSwitcher;
