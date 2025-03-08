import ThemeSwitcher from "@/components/ThemeSwitcher";
import Explore from "@/components/Explore";
import "@/global.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="h-screen grid grid-rows-[8%_84%_8%] transition-colors duration-300">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
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
				</ThemeProvider>
			</body>
		</html>
	);
}
