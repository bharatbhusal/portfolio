"use client";
import React from "react";
import SocialLinks from "@/components/SocialLinks";
import ToggleProfileQR from "@/components/ToggleProfileQR";

const Home: React.FC = () => {
	return (
		<main className="flex items-center justify-center overflow-y-auto">
			<div className="text-center p-5 w-full max-w-2xl relative">
				<ToggleProfileQR
					profileUrl="/bharatbhusal.jpeg"
					qrValue="https://bharatbhusal.com"
				/>

				<h1 className="text-4xl font-bold mt-4">
					Bharat Bhusal
				</h1>
				<p className="text-gray-400 text-[16px] mt-2 leading-[24px]">
					HMU for anything Tech. Fullstack, Web3 and Execution.
				</p>

				<SocialLinks />
			</div>
		</main>
	);
};

export default Home;
