import React from "react";
import {
	FaGithub,
	FaLinkedin,
	FaTelegram,
	FaInstagram,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";

const socialLinks = [
	{
		href: "https://github.com/bharatbhusal",
		icon: <FaGithub className="text-2xl" />,
		label: "GitHub",
	},
	{
		href: "https://twitter.com/bharatbhusal02",
		icon: <FaSquareXTwitter className="text-2xl" />,
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
		<div className="mt-4 flex justify-center space-x-6">
			{socialLinks.map((link) => (
				<a
					key={link.label}
					href={link.href}
					target="_blank"
					rel="noreferrer"
					className="hover:text-green-600 transition duration-200"
				>
					{link.icon}
				</a>
			))}
		</div>
	);
}

export default SocialLinks;
