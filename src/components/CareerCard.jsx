import React from "react";
import PropTypes from "prop-types";
import Card from "./Card"; // Adjust the path if needed

const CareerCard = ({
	company,
	role,
	duration,
	address,
	description,
	achievements,
}) => {
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
};

export default CareerCard;
