"use client";
import React from "react";
import { VscColorMode } from "react-icons/vsc";

import { Button } from "./Button";
import { useTheme } from "next-themes";

function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();
	const handleTheme = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};
	return (
		<Button
			label={<VscColorMode />}
			onClick={handleTheme}
			variant="outline"
			className={"fixed bottom-5 right-5 p-3 z-1"}
		/>
	);
}

export default ThemeSwitcher;
