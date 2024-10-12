import React from "react";
import EducationCard from "../components/EducationCard";
import educationData from "../data/educationData";

const Education = () => {
	const renderEducationCards = () => {
		return educationData.map((item, index) => (
			<EducationCard
				key={index}
				institution={item.institution}
				duration={item.duration}
				address={item.address}
				links={item.links}
				courses={item.courses}
				cgpa={item.cgpa}
			/>
		));
	};

	return (
		<div className="p-6 flex flex-col gap-6 w-full">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Education
			</h1>
			<div className="flex flex-col gap-8 items-center w-full">
				{renderEducationCards()}
			</div>
		</div>
	);
};

export default Education;
