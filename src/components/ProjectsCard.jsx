import React from "react";
import PropTypes from "prop-types";
import Button from "./Button"; // Adjust the path if needed
import Card from "./Card";

const ProjectsCard = ({
	project,
	description,
	technologies,
	links,
	className,
}) => {
	return (
		<Card
			title={project}
			description={description}
			className={className}
		>
			{/* Technologies Used */}
			<div className="mb-4">
				<h3 className="text-sm font-semibold mb-2">
					Technologies Used:
				</h3>
				<ul className="list-disc list-inside text-sm font-normal text-gray-600 dark:text-gray-400">
					{technologies.map((tech, idx) => (
						<li key={idx}>{tech}</li>
					))}
				</ul>
			</div>

			{/* Links */}
			<div className="flex justify-center mt-4 text-sm">
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
						className={`p-2 border ml-5 text-sm ${
							link.type === "website"
								? "text-blue-500"
								: "text-gray-700"
						}`}
					/>
				))}
			</div>
		</Card>
	);
};

ProjectsCard.propTypes = {
	project: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.string)
		.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string.isRequired,
			icon: PropTypes.elementType.isRequired,
		})
	).isRequired,
	className: PropTypes.string,
};

export default ProjectsCard;
