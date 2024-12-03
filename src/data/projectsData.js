import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const projectsData = [
	{
		project: "Portfolio Website",
		description:
			"A minimal, fully responsive website built with React.js to showcase my career, education, projects and social links.",
		technologies: [
			"React.js",
			"Vite",
			"Redux with persistence storage",
			"Tailwinds(majorly)",
			"React Router",
		],
		links: [
			{
				link: "https://github.com/bharatbhusal/portfolio",
				icon: FaGithub,
			},
			{
				link: "https://bharatbhusal.com",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Router Newsletter Website",
		description:
			"An open-source, fully responsive archive for daily newsletters prepared for Router Protocol Internal Team.",
		technologies: [
			"MERN Stack",
			"React Router",
			"Service Workers",
			"Redux with persistence storage",
			"CSS",
			"RBAC",
			"JWT Authentication",
			"React Context API",
		],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/router-newsletter",
				icon: FaGithub,
			},
			{
				link: "https://router-protocol-newsletter.vercel.app/",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Car Parking System",
		description:
			"A robust full stack application enabling admins, service providers, and users to manage/user parking slots and bookings.",
		technologies: [
			"MERN Stack",
			"React Router",
			"Redux with persistence storage",
			"Tailwinds",
			"RBAC",
			"JWT Authentication",
		],
		links: [
			{
				link: "https://github.com/bharatbhusal/car-parking",
				icon: FaGithub,
			},
			{
				link: "https://bharatbhusal.com/coming-soon",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Stader Staking Platform",
		description:
			"A cryptocurrency staking platform deployed on Goerli Testnet, enabling users to stake, unstake, and withdraw ETH, integrating with blockchain smart contracts via Ethers.js.",
		technologies: [
			"React.js",
			"Ethers.js",
			"Solidity",
			"React Context API",
			"CSS",
		],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/blockchain-learning-week-6",
				icon: FaGithub,
			},
			{
				link: "https://bharatbhusal.com/coming-soon",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "LeCal Telegram Bot",
		description:
			"A telegram bot automating group moderation tasks such as banning and muting users, with real-time dynamic content triggers.",
		technologies: [
			"Python",
			"Telegram Bot API",
			"Docker",
			"Third-party APIs",
		],
		links: [
			{
				link: "https://github.com/bharatbhusal/lecal",
				icon: FaGithub,
			},
			{
				link: "https://bharatbhusal.com/coming-soon",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Semester Routine Manager",
		description:
			"An application for managing and displaying class schedules and faculty contacts/details, featuring easily replaceable components.",
		technologies: ["React.js", "CSS", "React Router"],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/semester-routine",
				icon: FaGithub,
			},
			{
				link: "https://semester-routine.vercel.app/",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Whale Games",
		description:
			"A crypto wallet-integrated gambling game using Terra chain SDK for seamless on-chain transaction handling.",
		technologies: [
			"React.js",
			"Node.js",
			"Terra SDK",
			"React Context API",
			"React Router",
		],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/whale-game-dashboard",
				icon: FaGithub,
			},
			{
				link: "https://bharatbhusal.com/coming-soon",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Imagine Image",
		description:
			"Full stack application using OpenAI APIs to generate images based on textual prompts.",
		technologies: [
			"React.js",
			"Node.js",
			"OpenAI API",
			"CSS",
		],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/ai-image-generator",
				icon: FaGithub,
			},
			{
				link: "https://imagine-image.vercel.app",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "Function Selector",
		description:
			"A frontend application to extract the function selector from a given Solidity function signature.",
		technologies: [
			"React.js",
			"Tailwinds",
			"Vite",
			"js-sha3",
		],
		links: [
			{
				link:
					"https://github.com/bharatbhusal/function_selector",
				icon: FaGithub,
			},
			{
				link: "https://solidity-function-selector.vercel.app",
				icon: CgWebsite,
			},
		],
	},
	// {
	// 	project: "Router Admin Saviour",
	// 	description:
	// 		"A tool for Router Protocol’s community Moderators to resolve users' issues smoothly.",
	// 	technologies: ["React.js", "Node.js"],
	// 	links: [
	// 		{
	// 			link:
	// 				"https://github.com/bharatbhusal/router-admin-saviour",
	// 			icon: FaGithub,
	// 		},
	// 	],
	// },
	{
		project: "Stopwatch",
		description:
			"An Interactive and responsive frontend stopwatch application.",
		technologies: [
			"React.js",
			"CSS",
			"React Context API",
			"Email.js",
		],
		links: [
			{
				link: "https://github.com/bharatbhusal/stopwatch",
				icon: FaGithub,
			},
			{
				link: "https://meow-stopwatch.vercel.app/",
				icon: CgWebsite,
			},
		],
	},
	{
		project: "True and Dare",
		description:
			"A simple full stack questionnaire game for a group.",
		technologies: ["React.js", "Third-party APIs", "CSS"],
		links: [
			{
				link: "https://github.com/bharatbhusal/truth-or-dare",
				icon: FaGithub,
			},
			{
				link: "https://truth-and-dare.vercel.app",
				icon: CgWebsite,
			},
		],
	},
];

export default projectsData;
