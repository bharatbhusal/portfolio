"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import ProjectsCard from "@/components/cards/ProjectsCard";
import projectsData from "@/data/projectsData";

const Projects = () => {
	return (
		<div className="flex flex-col justify-around w-full h-[85vh] z-0 overflow-hidden overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">
				Projects
			</h1>
			<div className="flex w-full lg:w-[60%] lg:mx-auto h-[90%] px-4 justify-center">
				<Carousel orientation="vertical" className="w-fit">
					<CarouselContent>
						{projectsData.map((project, index) => (
							<CarouselItem
								key={index}
								className="basis-11/12 md:basis-1/2 lg:basis-1/3"
							>
								<ProjectsCard {...project} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

export default Projects;
