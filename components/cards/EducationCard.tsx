"use client";
import CustomCard from "@/components/cards";
import Link from "next/link";
import {
	FaLinkedin,
	FaInstagram,
	FaFacebook,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaMapLocation, FaXTwitter } from "react-icons/fa6";
import { EducationItem } from "@/types";

import { cn } from "@/lib/utils";

const EducationCard = ({
	institution,
	courses,
	cgpa,
	duration,
	address,
	links,
}: EducationItem) => {
	return (
		<CustomCard
			header={
				<div className="space-y-2">
					<h3 className="text-2xl font-bold text-primary">
						{institution}
					</h3>
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold">
							{duration}
						</span>
						<span className="text-sm text-muted-foreground">
							CGPA: {cgpa}
						</span>
					</div>
					<div className="text-sm text-muted-foreground inline-flex">
						<FaMapLocation className="mr-1" />
						{address}
					</div>
				</div>
			}
			content={
				<div className="space-y-4">
					<div className="flex flex-wrap gap-2">
						{courses.map((course, index) => (
							<span
								key={index}
								className={cn(
									"px-2 py-1 rounded-full text-sm bg-primary/50 dark:bg-primary/80"
								)}
							>
								{course}
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
							aria-label={`Visit ${link.type} link`}
						>
							{link.icon === CgWebsite ? (
								<CgWebsite className="h-6 w-6" />
							) : link.icon === FaLinkedin ? (
								<FaLinkedin className="h-6 w-6" />
							) : link.icon === FaXTwitter ? (
								<FaXTwitter className="h-6 w-6" />
							) : link.icon === FaInstagram ? (
								<FaInstagram className="h-6 w-6" />
							) : (
								<FaFacebook className="h-6 w-6" />
							)}
						</Link>
					))}
				</div>
			}
		/>
	);
};
export default EducationCard;
