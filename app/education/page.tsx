"use client";
import {
	Carousel,
	CarouselItem,
} from "@/components/ui/carousel";
import EducationCard from "@/components/cards/EducationCard";
import educationData from "@/data/educationData";

const Education = () => {
	return (
		<div className="flex flex-col justify-around w-full h-[85vh] z-0 overflow-hidden overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">
				Education
			</h1>
			<div className="flex w-full lg:w-[60%] lg:mx-auto h-[90%] px-4 justify-center">
				<Carousel orientation="vertical" className="w-fit">
					{educationData.map((item, index) => (
						<CarouselItem
							key={index}
							className="basis-11/12 md:basis-1/2 lg:basis-1/3"
						>
							<EducationCard {...item} />
						</CarouselItem>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Education;
