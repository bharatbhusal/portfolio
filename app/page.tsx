"use client";
import React, { useState } from "react";
import SocialLinks from "@/components/SocialLinks";
import Image from "next/image";
import { QrCodeIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const Home: React.FC = () => {
	const [showQR, setShowQR] = useState<boolean>(false);

	const toggleQR = () => setShowQR((prev) => !prev);

	return (
		<main className="flex items-center justify-center overflow-y-auto">
			<div className="text-center p-5 w-full max-w-2xl relative">
				<div className="relative inline-block w-[260px] h-[260px]">
					<div className="w-full h-full flex items-center justify-center rounded-full mx-auto mb-4">
						{showQR ? (
							<QRCodeSVG
								value="https://bharatbhusal.com"
								width={260}
								height={260}
								className="object-cover border-4 border-primary/50 rounded-[20px]"
							/>
						) : (
							<Image
								src="/bharatbhusal.jpeg"
								alt="Profile"
								width={260}
								height={260}
								className="rounded-full object-cover border-4 border-primary/50"
							/>
						)}
					</div>

					<button
						className="absolute bottom-0 right-0 bg-background rounded-full border-2 border-primary/50 cursor-pointer w-[50px] h-[50px] flex items-center justify-center shadow-lg"
						onClick={toggleQR}
						aria-label="Toggle QR Code"
					>
						{showQR ? (
							<Image
								src="/bharatbhusal.jpeg"
								alt="Profile Small"
								width={60}
								height={60}
								className="rounded-full object-cover"
							/>
						) : (
							<QrCodeIcon />
						)}
					</button>
				</div>

				<h1 className="text-4xl font-bold mt-4">
					Bharat Bhusal
				</h1>
				<p className="text-gray-400 text-[16px] mt-2 leading-[24px]">
					Security Auditor | MERN Stack Developer | Community
					Manager
				</p>

				<SocialLinks />
			</div>
		</main>
	);
};

export default Home;
