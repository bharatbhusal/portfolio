import React from "react";
import { VscColorMode } from "react-icons/vsc";
import useTheme from "../hooks/useTheme";
import Button from "./Button";

function ThemeSwitcher() {
	const { toggleTheme } = useTheme();

	return (
		<Button
			label={<VscColorMode />}
			onClick={toggleTheme}
			variant="filled"
			className={"fixed bottom-5 right-5 p-3 z-1"}
		/>
	);
}

export default ThemeSwitcher;
