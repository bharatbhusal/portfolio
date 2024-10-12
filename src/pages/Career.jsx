import React from "react";
import CareerCard from "../components/CareerCard"; // Adjust the path if needed
import Slider from "react-slick";

const Career = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const data = [
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
		},
	];

	const renderCareerCards = () => {
		return data.map((item, index) => (
			<CareerCard
				key={index}
				company={item.company}
				role={item.role}
				duration={item.duration}
				address={item.address}
				description={item.description}
				achievements={item.achievements}
			/>
		));
	};

	return (
		<div className="p-6 flex flex-col gap-6">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Career
			</h1>
			<div className="flex flex-col gap-5 items-center w-full">
				{" "}
				{/* Center items */}
				{renderCareerCards()}
			</div>
		</div>
	);
};

export default Career;
