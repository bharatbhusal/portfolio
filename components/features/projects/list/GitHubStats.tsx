"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface GitHubStatsProps {
  username: string;
}

const GitHubStats = ({ username }: GitHubStatsProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const themeParam = isDark ? "dark" : "default";

  if (!username) {
    return (
      <div className="w-full">
        <p className="text-center text-gray-500 dark:text-gray-400">
          GitHub username is not configured. Please set your GitHub username in
          the admin dashboard.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Top Langs Card */}
        <div className="flex justify-center">
          <Image
            src={`https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${themeParam}&hide_border=true&background=00000000`}
            alt="GitHub Top Langs"
            width={495}
            height={195}
            className="rounded-lg"
            unoptimized
          />
        </div>

        {/* GitHub Streak Stats */}
        <div className="flex justify-center">
          <Image
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${themeParam}&hide_border=true&background=00000000`}
            alt="GitHub Streak Stats"
            width={495}
            height={195}
            className="rounded-lg"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
