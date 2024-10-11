import React, { useState } from "react";
import { LuMenuSquare } from "react-icons/lu";
import Button from "./Button";
import useTheme from "../hooks/useTheme";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";

const Explore = () => {
	// State to control the visibility of the dropdown
	const [isOpen, setIsOpen] = useState(false);
	const { darkMode } = useTheme();
	// Function to toggle the dropdown menu
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="fixed top-5 right-5">
			<Button
				label={<LuMenuSquare />}
				onClick={toggleMenu}
				variant="filled"
				className={"p-3"}
			/>

			<div
				className={`absolute right-0 transition-all duration-300 overflow-hidden ${
					isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<ul className="px-0 py-3">
					{[<PiBagSimpleFill />, <FaGraduationCap />].map(
						(item, index) => (
							<li key={index} className="pb-2">
								<Button
									label={item}
									onClick={() => console.log(`Button Click`)}
									variant="outline"
									className={`p-3 border ${
										darkMode ? "border-white" : "border-black"
									}`}
								/>
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	);
};

export default Explore;
