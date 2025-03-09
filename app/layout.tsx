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
			<head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>

				{/* SEO Meta Tags */}
				<title>Bharat Bhusal</title>
				<meta
					name="description"
					content="HMU for anything Tech. Fullstack, Web3 and Execution."
				/>
				<meta
					name="keywords"
					content="Bharat Bhusal, Security Auditor, MERN Stack Developer, Community Manager, Developer, Web Developer, Blockchain Security"
				/>
				<meta name="author" content="Bharat Bhusal" />

				{/* Custom Font: Poppins */}
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>

				{/* Open Graph Meta Tags for Social Media Sharing */}
				<meta
					property="og:title"
					content="Bharat Bhusal - HMU for anything Tech. Fullstack, Web3 and Execution."
				/>
				<meta
					property="og:description"
					content="Discover the work of Bharat Bhusal, a skilled Security Auditor and MERN Stack Developer with experience in blockchain security and fullstack web application development."
				/>
				<meta
					property="og:image"
					content="/bharatbhusal.jpeg"
				/>
				<meta
					property="og:url"
					content="https://bharatbhusal.com"
				/>
				<meta property="og:type" content="website" />

				{/* Twitter Card Meta Tags */}
				<meta
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					name="twitter:title"
					content="Bharat Bhusal - HMU for anything Tech. Fullstack, Web3 and Execution."
				/>
				<meta
					name="twitter:description"
					content="Explore Bharat Bhusal's professional skills in security auditing, MERN stack development, and community management."
				/>
				<meta
					name="twitter:image"
					content="/bharatbhusal.jpeg"
				/>
				<meta name="twitter:site" content="@bharatbhusal02" />

				{/* Canonical URL for SEO */}
				<link rel="canonical" href="https://bharatbhusal.com" />

				{/* Favicon */}
				<link
					rel="icon"
					type="image/jpeg"
					href="/bharatbhusal.jpeg"
				/>
			</head>
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
