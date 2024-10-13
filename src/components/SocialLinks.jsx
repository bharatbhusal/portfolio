import React from "react";
import {
	FaGithub,
	FaLinkedin,
	FaTelegram,
	FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import Button from "./Button";

const socialLinks = [
	{
		href: "https://github.com/bharatbhusal",
		icon: <FaGithub className="text-2xl" />,
		label: "GitHub",
	},
	{
		href: "https://twitter.com/bharatbhusal02",
		icon: <FaXTwitter className="text-2xl" />,
		label: "Twitter",
	},
	{
		href: "https://t.me/petermartin0",
		icon: <FaTelegram className="text-2xl" />,
		label: "Telegram",
	},
	{
		href: "https://substack.com/@bharatbhusal",
		icon: <SiSubstack className="text-2xl" />,
		label: "Substack",
	},
	{
		href: "https://linkedin.com/in/bharatbhusal/",
		icon: <FaLinkedin className="text-2xl" />,
		label: "LinkedIn",
	},
	{
		href: "https://www.instagram.com/bharatbhusal",
		icon: <FaInstagram className="text-2xl" />,
		label: "Instagram",
	},
];

function SocialLinks() {
	return (
		<div className="mt-4 flex justify-center flex-wrap space-x-2">
			{socialLinks.map((link, index) => (
				<Button
					key={index}
					label={link.icon}
					onClick={() =>
						window.open(
							link.href,
							"_blank",
							"noopener,noreferrer"
						)
					}
					variant="outline"
					className={"p-3"}
				/>
			))}
		</div>
	);
}

export default SocialLinks;
