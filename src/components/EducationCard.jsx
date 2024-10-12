import React from "react";
import PropTypes from "prop-types";
import Card from "./Card"; // Adjust the path if needed
import Button from "./Button";
import useTheme from "../hooks/useTheme";

const EducationCard = ({
	institution,
	courses,
	cgpa,
	duration,
	address,
	links,
}) => {
	const { darkMode } = useTheme();
	return (
		<Card title={institution} description={`CGPA: ${cgpa}`}>
			<div className="flex flex-col gap-2 mb-3 text-center">
				<div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
					<span className="italic">{address}</span>
					<span className="italic">{duration}</span>
				</div>
			</div>
			<div>
				<h3 className="text-md font-semibold mb-2">
					Key Courses:
				</h3>
				<ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
					{courses.map((course, idx) => (
						<li key={idx}>{course}</li>
					))}
				</ul>
			</div>
			<div className="flex justify-center mt-4">
				{links.map((link, idx) => (
					<Button
						key={idx}
						label={<link.icon />}
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

EducationCard.propTypes = {
	institution: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	courses: PropTypes.arrayOf(PropTypes.string).isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string.isRequired,
			icon: PropTypes.elementType.isRequired,
			type: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default EducationCard;
