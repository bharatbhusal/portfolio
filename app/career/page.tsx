"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import CareerCard from "@/components/cards/CareerCard";
import careerData from "@/data/careerData";

const Career = () => {
	return (
		<div className="flex flex-col justify-around w-full h-[90vh] z-0">
			<h1 className="text-4xl font-bold text-center">
				Career
			</h1>
			<div className="flex justify-between w-full h-[90%] px-4">
				<Carousel opts={{ loop: true }} className="w-full">
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
					<CarouselPrevious className="left-2" />
					<CarouselNext className="right-2" />
				</Carousel>
			</div>
		</div>
	);
};

export default Career;
