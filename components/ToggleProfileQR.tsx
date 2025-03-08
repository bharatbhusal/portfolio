"use client";
import React, { useState } from "react";
import Image from "next/image";
import { QrCodeIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { ToggleProfileQRProps } from "@/types";

const ToggleProfileQR: React.FC<ToggleProfileQRProps> = ({
	profileUrl,
	qrValue,
}) => {
	const [showQR, setShowQR] = useState<boolean>(false);

	const toggleQR = () => setShowQR((prev) => !prev);

	return (
		<div className="relative inline-block w-[260px] h-[260px] mb-5">
			<div className="w-full h-full flex items-center justify-center rounded-full mx-auto mb-4 relative">
				<Image
					src={profileUrl}
					alt="Profile"
					width={260}
					height={260}
					className={`absolute inset-0 transition-all duration-300 ease-in-out ${
						showQR
							? "opacity-0 scale-90"
							: "opacity-100 scale-100"
					} rounded-full object-cover border-4 border-primary/50`}
				/>

				<div
					className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
						showQR
							? "opacity-100 scale-100"
							: "opacity-0 scale-90"
					}`}
				>
					<QRCodeSVG
						value={qrValue}
						width={260}
						height={260}
						className="border-4 border-primary/50 rounded-[20px]"
					/>
				</div>
			</div>

			<button
				className="absolute bottom-0 right-0 bg-background rounded-full border-2 border-primary/50 cursor-pointer w-[50px] h-[50px] flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
				onClick={toggleQR}
				aria-label="Toggle QR Code"
			>
				{showQR ? (
					<Image
						src={profileUrl}
						alt="Profile Small"
						width={60}
						height={60}
						className="rounded-full object-cover"
					/>
				) : (
					<QrCodeIcon className="w-6 h-6 transition-all duration-300 ease-in-out transform" />
				)}
			</button>
		</div>
	);
};

export default ToggleProfileQR;
