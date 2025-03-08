"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import CareerCard from "@/components/cards/CareerCard";
import careerData from "@/data/careerData";

const Career = () => {
	return (
		<div className="flex flex-col justify-around w-full h-[85vh] z-0 overflow-hidden overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">
				Career
			</h1>
			<div className="flex w-full lg:w-[60%] lg:mx-auto h-[90%] px-4 justify-center">
				<Carousel orientation="vertical" className="w-fit">
					<CarouselContent>
						{careerData.map((item, index) => (
							<CarouselItem
								key={index}
								className="basis-11/12 md:basis-1/2 lg:basis-1/3"
							>
								<CareerCard {...item} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

export default Career;
