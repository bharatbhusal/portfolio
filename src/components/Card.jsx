import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme"; // Assuming you have a useTheme hook

const Card = ({
	title,
	description,
	children,
	className,
}) => {
	const { darkMode } = useTheme(); // Get current theme

	return (
		<div
			className={`p-5 rounded-lg shadow-md transition-all transform duration-300 ${
				darkMode
					? "bg-gray-800 text-white hover:bg-gray-700"
					: "bg-white text-black hover:bg-gray-100"
			} ${className} w-full max-w-screen-md md:max-w-screen-lg lg:max-w-4xl mx-auto`}
		>
			<h2 className="text-2xl font-semibold mb-3">{title}</h2>
			<p
				className={`${
					darkMode ? "text-gray-300" : "text-gray-500"
				} mb-4 text-green-600`}
			>
				{description}
			</p>
			<div>{children}</div>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Card;
