"use client";
import { FaGamepad, FaTelegram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { CareerItem } from "@/types";

const careerData: CareerItem[] = [
	{
		company: "jaisriram",
		role: "Tech Lead",
		duration: "10/2024 - Present",
		address: "Remote",
		description: `Embark on a transformative journey with $JSR, evolving from a devoted seeker to the enlightened master of "Chant-to-Earn."`,
		achievements: [
			"Led the development and successful launch of the company website within 30 days of joining.",
			"Directed a team of developers to deliver a Telegram mini-game within 60 days, ensuring smooth deployment and timely execution.",
			"Streamlined and structured the company's technical operations by consolidating scattered development efforts.",
			"Supervised bug fixes, feature enhancements, retention strategies, DevOps, and continuous game monitoring.",
			"Independently integrated Ouroboro Chain and account abstraction using the Thirdweb SDK, enhancing blockchain interoperability and user experience.",
		],
		links: [
			{
				link: "https://www.jaisriram.io/",
				icon: CgWebsite,
				type: "website",
			},
			{
				link: "https://x.com/jsr_coin",
				icon: FaXTwitter,
				type: "twitter",
			},
			{
				link: "https://t.me/jaisriram_io_community",
				icon: FaTelegram,
				type: "telegram",
			},

			{
				link: "https://t.me/jaisriram_io_bot/game",
				icon: FaGamepad,
				type: "game",
			},
		],
	},
	{
		company: "Router Protocol",
		role: "Community Manager",
		duration: "08/2023 - 02/2025",
		address: "Remote",
		description:
			"Bridging blockchain ecosystems to onboard the next billion users into Web3 by eliminating blockchain fragmentation.",
		achievements: [
			"Managed community engagement, provided support, and resolved technical queries.",
			"Researched and presented key updates on interoperability within the Web3 space.",
			"Optimized Discord and Telegram bots to enhance automation and efficiency.",
			"Enforced community guidelines to maintain a healthy and engaging environment.",
		],
		links: [
			{
				link: "https://www.routerprotocol.com/",
				icon: CgWebsite,
				type: "website",
			},
			{
				link: "https://x.com/routerprotocol",
				icon: FaXTwitter,
				type: "twitter",
			},
			{
				link: "https://t.me/routerprotocol",
				icon: FaTelegram,
				type: "telegram",
			},
		],
	},
	{
		company: "0xCommit",
		role: "Security Auditor and Community Manager",
		duration: "02/2024 - 10/2024",
		address: "Remote",
		description:
			"Enhancing the security of decentralized systems through comprehensive smart contract audits.",
		achievements: [
			"Conducted independent and collaborative audits of client smart contracts.",
			"Prepared detailed audit reports with clear, concise explanations of identified vulnerabilities.",
			"Established a new community centered on smart contract security and audits.",
			"Consistently created and shared educational content, including articles and social media updates.",
			"Curated weekly and monthly hack analysis reports.",
			"Organized and hosted AMA sessions with the community and industry partners.",
		],
		links: [
			{
				link: "https://0xcommit.com",
				icon: CgWebsite,
				type: "website",
			},
			{
				link: "https://x.com/0xcommitaudits",
				icon: FaXTwitter,
				type: "twitter",
			},
			{
				link: "https://t.me/OxCommitAudits",
				icon: FaTelegram,
				type: "telegram",
			},
		],
	},
	{
		company: "Terraform Labs",
		role: "Community Moderator",
		duration: "09/2021 - 08/2023",
		address: "Remote",
		description:
			"Supporting a passionate community and developer ecosystem to drive innovation within the Terra blockchain network.",
		achievements: [
			"Facilitated community engagement, provided user support, and addressed technical queries.",
			"Maintained community guidelines to foster a safe and productive environment.",
			"Optimized Telegram bots and automated tasks for improved efficiency.",
			"Kept users informed about upcoming ecosystem developments and company decisions.",
		],
		links: [
			{
				link: "https://www.terra.money/",
				icon: CgWebsite,
				type: "website",
			},
			{
				link: "https://x.com/terra_money",
				icon: FaXTwitter,
				type: "twitter",
			},
			{
				link: "https://t.me/TerraNetworkLobby",
				icon: FaTelegram,
				type: "telegram",
			},
		],
	},
];
export default careerData;
