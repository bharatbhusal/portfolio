"use client";
import React from "react";
import SocialLinks from "@/components/SocialLinks";

function Home() {
	return (
		<main className="flex items-center justify-center overflow-y-auto">
			<div className="text-center p-5 w-full max-w-2xl">
				<img
					src={`/bharatbhusal.jpeg`}
					alt="Profile"
					className="w-65 h-60 rounded-full mx-auto mb-4"
				/>
				<h1 className="text-4xl font-bold">Bharat Bhusal</h1>
				<p className="text-gray-400 text-[16px] mt-2 leading-[24px]">
					Security Auditor | MERN Stack Developer | Community
					Manager
				</p>

				<SocialLinks />
			</div>
		</main>
	);
}

export default Home;
