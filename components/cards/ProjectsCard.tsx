import CustomCard from "@/components/cards";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { ProjectItem } from "@/types";

const ProjectsCard = ({
	project,
	description,
	technologies,
	links,
}: ProjectItem) => {
	return (
		<CustomCard
			header={
				<h3 className="text-2xl font-bold">{project}</h3>
			}
			content={
				<div className="space-y-4">
					<p className="text-base">{description}</p>
					<div className="flex flex-wrap gap-2">
						{technologies.map((tech, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-muted rounded-full text-sm"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			}
			footer={
				<div className="flex gap-4 justify-end">
					{links.map((link, index) => (
						<Link
							key={index}
							href={link.link}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition-colors"
							aria-label={`Visit ${
								link.icon === FaGithub ? "GitHub" : "Website"
							} link`}
						>
							{link.icon === FaGithub ? (
								<FaGithub className="h-6 w-6" />
							) : (
								<CgWebsite className="h-6 w-6" />
							)}
						</Link>
					))}
				</div>
			}
		/>
	);
};
export default ProjectsCard;
