import Carousel from "../components/utils/Carousel";

import EducationCard from "../components/EducationCard";
import educationData from "../data/educationData";

const Education = () => {
	const SLIDES = educationData.map((item, index) => {
		return (
			<EducationCard
				key={index}
				institution={item.institution}
				courses={item.courses}
				cgpa={item.cgpa}
				duration={item.duration}
				address={item.address}
				links={item.links}
			/>
		);
	});

	const OPTIONS = { loop: true };
	return (
		<div className="flex flex-col justify-around w-full h-[90vh] z-0">
			<h1 className="text-4xl font-bold text-center">
				Education
			</h1>
			<div className="flex justify-between w-full h-[90%] overflow-view">
				<Carousel slides={SLIDES} options={OPTIONS} />
			</div>
		</div>
	);
};

export default Education;
