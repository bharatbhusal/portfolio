import React from "react";
import PropTypes from "prop-types";
import Card from "./Card"; // Adjust the path if needed
import Button from "./Button";
import useTheme from "../hooks/useTheme";

const CareerCard = ({
	company,
	role,
	duration,
	address,
	description,
	achievements,
	links,
}) => {
	const { darkMode } = useTheme();
	return (
		<Card title={company} description={role}>
			<div className="flex flex-col gap-2 mb-3 text-center">
				<div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
					<span className="italic">{duration}</span>
					<span className="italic">{address}</span>
				</div>
				<p className="text-lg text-gray-700 dark:text-gray-300 text-left">
					{description}
				</p>
			</div>
			<div>
				<h3 className="text-md font-semibold mb-2">
					Key Achievements/Tasks:
				</h3>
				<ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
					{achievements.map((achievement, idx) => (
						<li key={idx}>{achievement}</li>
					))}
				</ul>
			</div>
			{/* Render social links */}
			<div className="flex justify-center mt-4">
				{links.map((link, idx) => (
					<Button
						key={idx}
						label={link.icon}
						onClick={() =>
							window.open(
								link.link,
								"_blank",
								"noopener,noreferrer"
							)
						}
						variant="outline"
						className={`p-3 border ml-5 ${
							darkMode ? "border-white" : "border-black"
						}`}
					/>
				))}
			</div>
		</Card>
	);
};

CareerCard.propTypes = {
	company: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	achievements: PropTypes.arrayOf(PropTypes.string)
		.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string.isRequired,
			icon: PropTypes.element.isRequired,
			type: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default CareerCard;
