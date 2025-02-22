import CustomCard from "@/components/cards";
import Link from "next/link";
import { FaGamepad, FaTelegram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { CareerItem } from "@/types";

const CareerCard = ({
	company,
	role,
	duration,
	address,
	description,
	achievements,
	links,
}: CareerItem) => {
	return (
		<CustomCard
			header={
				<div className="space-y-2">
					<h3 className="text-2xl font-bold">{company}</h3>
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold">{role}</span>
						<span className="text-sm text-muted-foreground">
							{duration}
						</span>
					</div>
					<p className="text-sm text-muted-foreground">
						{address}
					</p>
				</div>
			}
			content={
				<div className="space-y-4">
					<p className="text-base">{description}</p>
					<ul className="list-disc pl-6 space-y-2">
						{achievements.map((achievement, index) => (
							<li key={index} className="text-sm">
								{achievement}
							</li>
						))}
					</ul>
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
							aria-label={`Visit ${link.type} link`}
						>
							{link.icon === CgWebsite ? (
								<CgWebsite className="h-6 w-6" />
							) : link.icon === FaXTwitter ? (
								<FaXTwitter className="h-6 w-6" />
							) : link.icon === FaTelegram ? (
								<FaTelegram className="h-6 w-6" />
							) : (
								<FaGamepad className="h-6 w-6" />
							)}
						</Link>
					))}
				</div>
			}
		/>
	);
};

export default CareerCard;
