import { FaTelegram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";

const careerData = [
	{
		company: "0xCommit",
		role: "Security Auditor",
		duration: "02/2024 - Present",
		address: "Remote",
		description:
			"Smart Contract Security Audits to fortify decentralized systems and ensure the integrity of blockchain networks.",
		achievements: [
			"Auditing client's smart contracts - Solo and Teamed.",
			"Preparing Audit report with simpler explanation of the issues found.",
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
		company: "0xCommit",
		role: "Community Manager",
		duration: "07/2024 - Present",
		address: "Remote",
		description:
			"Smart Contract Security Audits to fortify decentralized systems and ensure the integrity of blockchain networks.",
		achievements: [
			"Establish a brand new community around security and smart contract audits.",
			"Consistently frame and post articles, tweets, and articles on various social media platforms.",
			"Prepare weekly and monthly Hack tracks and analysis.",
			"Conducting AMA sessions with the community and partners.",
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
		company: "Router Protocol",
		role: "Community Manager",
		duration: "08/2023 - Present",
		address: "Remote",
		description:
			"Onboarding the next billion users to web3 by destroying blockchain segregation.",
		achievements: [
			"Community Engagement, Support, and Troubleshooting.",
			"Research and presentation about interoperability news in the web3 space.",
			"Discord & Telegram bot optimization & task automation.",
			"Community Guidelines Enforcement.",
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
		company: "Terraform Labs",
		role: "Community Moderator",
		duration: "09/2021 - 08/2023",
		address: "Remote",
		description:
			"Fueled by a passionate community and deep developer talent pool, the Terra blockchain is built to enable the next generation of Web3 products and services.",
		achievements: [
			"Community Engagement, Support, and Troubleshooting.",
			"Community Guidelines Enforcement.",
			"Telegram bot optimization and task automation.",
			"Keeping users updated with the company's upcoming ecosystem and development decisions.",
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
