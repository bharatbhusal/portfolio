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
import { SocialLink } from "@/types";

const aboutMe: SocialLink[] = [
	{
		link: "https://github.com/bharatbhusal",
		icon: FaGithub,
		type: "github",
	},
	{
		link: "https://twitter.com/bharatbhusal02",
		icon: FaXTwitter,
		type: "twitter",
	},
	{
		link: "https://t.me/petermartin0",
		icon: FaTelegram,
		type: "telegram",
	},
	{
		link: "mailto:bharatbhusal78@gmail.com",
		icon: HiOutlineMail,
		type: "email",
	},
	{
		link: "https://substack.com/@bharatbhusal",
		icon: SiSubstack,
		type: "substack",
	},
	{
		link: "https://linkedin.com/in/bharatbhusal/",
		icon: FaLinkedin,
		type: "linkedin",
	},
	{
		link: "https://www.instagram.com/bharatbhusal",
		icon: FaInstagram,
		type: "instagram",
	},
];

export default aboutMe;
