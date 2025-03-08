"use client";
import React from "react";
import { Button } from "./Button";
import aboutMe from "../data/aboutMe";

function SocialLinks() {
	return (
		<div className="mt-4 flex justify-center flex-wrap space-x-2">
			{aboutMe.map((link, index) => (
				<Button
					key={index}
					label={React.createElement(link.icon, {
						className: "text-2xl",
					})}
					onClick={() =>
						window.open(
							link.link,
							"_blank",
							"noopener,noreferrer"
						)
					}
					variant="outline"
					className="p-2 rounded-full"
				/>
			))}
		</div>
	);
}

export default SocialLinks;
