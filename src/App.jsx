import React, { useEffect } from "react";
import IMAGE from "./assets/bharatbhusal.jpeg"; // Ensure this image path is correct
import ThemeSwitcher from "./components/ThemeSwitcher";
import SocialLinks from "./components/SocialLinks";
import useTheme from "./hooks/useTheme";

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
	}, [darkMode]); // Run this effect whenever darkMode changes

	return (
		<div
			className={`min-h-screen p-5 flex flex-col items-center justify-center transition-colors duration-300 ${
				darkMode
					? "bg-[#1a1a1a] text-white"
					: "bg-gray-100 text-black"
			}`}
		>
			<div className="text-center">
				<img
					src={IMAGE}
					alt="Profile"
					className="w-65 h-60 rounded-full mx-auto mb-4"
				/>
				<h1 className="text-4xl font-bold">Bharat Bhusal</h1>
				<p className="text-gray-400 mt-2">
					Security Auditor | MERN Stack Developer | Community
					Manager
				</p>

				<SocialLinks />
			</div>

			<ThemeSwitcher />
		</div>
	);
}

export default App;
