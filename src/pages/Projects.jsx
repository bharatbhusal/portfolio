import Carousel from "../components/utils/Carousel";
import ProjectsCard from "../components/ProjectsCard";
import projectsData from "../data/projectsData";

const Projects = () => {
	const SLIDES = projectsData.map((project, index) => {
		return (
			<ProjectsCard
				key={index}
				project={project.project}
				description={project.description}
				technologies={project.technologies}
				links={project.links}
			/>
		);
	});

	const OPTIONS = { loop: true };

	return (
		<div className="flex flex-col justify-around w-full h-[90vh] z-0">
			<h1 className="text-4xl font-bold text-center">
				Projects
			</h1>
			<div className="flex justify-between w-full h-[90%]">
				<Carousel slides={SLIDES} options={OPTIONS} />
			</div>
		</div>
	);
};

export default Projects;
