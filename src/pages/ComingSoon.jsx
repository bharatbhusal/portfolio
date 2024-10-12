import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ComingSoon = () => {
	const navigate = useNavigate();
	return (
		<div className={`text-center`}>
			<h1 className="text-6xl font-bold mb-4">Coming Soon</h1>
			<p className="text-2xl text-gray-500 mb-8">
				I am working hard to bring you something amazing on this
				website. Stay tuned!
			</p>
			<Button
				label="Go Home"
				variant="filled"
				className="p-4 border border-white font-semibold"
				onClick={() => navigate("/")}
			/>
		</div>
	);
};

export default ComingSoon;
