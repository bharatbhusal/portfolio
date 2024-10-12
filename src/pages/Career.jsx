import React from "react";
import CareerCard from "../components/CareerCard";
import careerData from "../data/careerData";

const Career = () => {
	const renderCareerCards = () => {
		return careerData.map((item, index) => (
			<CareerCard
				key={index}
				company={item.company}
				role={item.role}
				duration={item.duration}
				address={item.address}
				description={item.description}
				achievements={item.achievements}
				links={item.links}
			/>
		));
	};

	return (
		<div className="p-6 flex flex-col gap-6 w-full">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Career
			</h1>
			<div className="flex flex-col gap-8 items-center w-full">
				{renderCareerCards()}
			</div>
		</div>
	);
};

export default Career;
