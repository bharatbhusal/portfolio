"use client";
import React, { JSX, useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { Button } from "./Button";
import useTheme from "../hooks/useTheme";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Explore = (): JSX.Element => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const { darkMode } = useTheme();

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleNavigation = (path: string) => {
		router.push(`/${path}`);
		setIsOpen(false);
	};

	const menuItems: [React.ReactNode, string][] = [
		[<FaHome key="home" />, ""],
		[<PiBagSimpleFill key="career" />, "career"],
		[<FaGraduationCap key="education" />, "education"],
		[<GrProjects key="projects" />, "projects"],
	];

	return (
		<div className="fixed top-5 right-5 z-50">
			<Button
				label={
					isOpen ? <IoArrowBackCircle /> : <LuSquareMenu />
				}
				onClick={isOpen ? () => router.back() : toggleMenu}
				variant="filled"
				className="p-3"
				aria-label={isOpen ? "Close menu" : "Open menu"}
			/>

			<div
				className={`absolute right-0 transition-all duration-300 overflow-hidden ${
					isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<ul className="px-0 py-3">
					{menuItems.map(([icon, path], index) => (
						<li key={index} className="pb-2">
							<Button
								label={icon}
								onClick={() => handleNavigation(path)}
								variant="outline"
								className={`p-3 ${
									darkMode ? "border-white" : "border-black"
								}`}
								aria-label={`Navigate to ${path || "home"}`}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Explore;
