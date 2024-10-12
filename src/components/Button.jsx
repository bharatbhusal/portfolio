import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/themeSlice"; // Adjust the import path as needed

const Button = ({
	label,
	onClick,
	className,
	type = "button",
	variant = "filled",
}) => {
	// Get the darkMode state from Redux store
	const darkMode = useSelector(selectDarkMode);

	// Define button styles based on the variant and dark mode
	const buttonStyles =
		variant === "filled"
			? "bg-gray-800 text-white hover:bg-gray-700"
			: darkMode
			? "bg-transparent text-white hover:bg-gray-700"
			: "bg-transparent text-black hover:bg-gray-200";

	return (
		<button
			type={type}
			onClick={onClick}
			className={`shadow-lg transition duration-200 hover:text-green-600 rounded-full ${buttonStyles} ${className}`}
		>
			{label}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
	type: PropTypes.string,
	variant: PropTypes.oneOf(["filled", "outline"]),
};

export default Button;
