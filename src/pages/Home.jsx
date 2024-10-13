import React from "react";

import SocialLinks from "../components/SocialLinks";

function Home() {
	return (
		<div className="text-center">
			<img
				src={`/bharatbhusal.jpeg`}
				alt="Profile"
				className="w-65 h-60 rounded-full mx-auto mb-4"
			/>
			<h1 className="text-4xl font-bold">Bharat Bhusal</h1>
			<p className="text-gray-400 mt-2">
				Security Auditor | MERN Stack Developer | Community
				Manager
			</p>

			<SocialLinks />
		</div>
	);
}

export default Home;
