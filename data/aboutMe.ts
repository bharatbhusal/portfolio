"use client";
import {
	FaGithub,
	FaLinkedin,
	FaTelegram,
	FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiSubstack } from "react-icons/si";
import { SocialItem } from "@/types";

const aboutMe: SocialItem[] = [
	{
		label: "GitHub",
		link: "https://github.com/bharatbhusal",
		icon: FaGithub,
		type: "github",
	},
	{
		label: "Twitter",
		link: "https://twitter.com/bharatbhusal02",
		icon: FaXTwitter,
		type: "twitter",
	},
	{
		label: "Telegram",
		link: "https://t.me/petermartin0",
		icon: FaTelegram,
		type: "telegram",
	},
	{
		label: "Email",
		link: "mailto:bharatbhusal78@gmail.com",
		icon: HiOutlineMail,
		type: "email",
	},
	{
		label: "Substack",
		link: "https://substack.com/@bharatbhusal",
		icon: SiSubstack,
		type: "substack",
	},
	{
		label: "LinkedIn",
		link: "https://linkedin.com/in/bharatbhusal/",
		icon: FaLinkedin,
		type: "linkedin",
	},
	{
		label: "Instagram",
		link: "https://www.instagram.com/bharatbhusal",
		icon: FaInstagram,
		type: "instagram",
	},
];

export default aboutMe;
