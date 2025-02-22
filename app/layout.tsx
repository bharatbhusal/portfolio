"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Explore from "@/components/Explore";
import "@/global.css";
import store from "@/store";
import { Provider } from "react-redux";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Provider store={store}>
				<body
					className={
						"h-screen grid grid-rows-[10%_80%_10%] transition-colors duration-300"
					}
				>
					<div className="flex items-center">
						<div className="flex-grow text-center"></div>
						<div className="w-1/10 text-center">
							<Explore />
						</div>
					</div>
					{children}

					<div className="flex items-center">
						<div className="flex-grow text-center"></div>
						<div className="w-1/10 text-center">
							<ThemeSwitcher />
						</div>
					</div>
				</body>
			</Provider>
		</html>
	);
}

// bg-[#1a1a1a] text-white
