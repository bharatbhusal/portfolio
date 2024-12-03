import Carousel from "../components/utils/Carousel";

import CareerCard from "../components/CareerCard";
import careerData from "../data/careerData";

const Career = () => {
	const SLIDES = careerData.map((item, index) => {
		return (
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
		);
	});

	const OPTIONS = { loop: true };
	return (
		<div className="flex flex-col justify-around w-full h-[90vh] z-0">
			<h1 className="text-4xl font-bold text-center">
				Career
			</h1>
			<div className="flex justify-between w-full h-[90%]">
				<Carousel slides={SLIDES} options={OPTIONS} />
			</div>
		</div>
	);
};

export default Career;
