"use client";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { ProjectItem } from "@/types";

const projectsData: ProjectItem[] = [
  {
    project: "Portfolio Website",
    description:
      "A modern Next.js 15 portfolio with macOS-inspired design, fullscreen video backgrounds, GitHub stats integration, and responsive UI. Features dark/light themes, vCard QR codes, and pinned projects showcase.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "next-themes",
      "Embla Carousel",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/portfolio",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://bharatbhusal.com",
        icon: CgWebsite,
        type: "website",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "Pockity",
    description:
      "Secure multi-tenant cloud storage service with isolated S3 buckets per user. Features API key authentication, quota management, admin approval workflow, and comprehensive audit logging.",
    technologies: [
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma ORM",
      "AWS S3",
      "JWT",
      "bcrypt",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/pockity",
        icon: FaGithub,
        type: "github",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "CogniFlow",
    description:
      "AI-powered workflow automation platform combining LLMs, document processing, and web search. Features RAG with ChromaDB, multi-step workflows, real-time chat interface, and FastAPI backend.",
    technologies: [
      "React 18",
      "TypeScript",
      "Redux Toolkit",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "ChromaDB",
      "OpenAI API",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/cogniFlow",
        icon: FaGithub,
        type: "github",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "MoodSync",
    description:
      "A heartfelt full-stack Next.js app to log and share emotions. Built for a special friend—whenever I miss her, I post my feelings here. Features secure authentication and emotion history.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "JWT",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/emotions",
        icon: FaGithub,
        type: "github",
      },
    ],
  },
  {
    project: "Router Newsletter Website",
    description:
      "Full-stack newsletter archive for Router Protocol with CRUD operations, role-based access control, JWT authentication, and service workers for offline support. Features responsive UI and admin panel.",
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "JWT",
      "RBAC",
      "Service Workers",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/router-newsletter",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://newsletter.bharatbhusal.com/",
        icon: CgWebsite,
        type: "website",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "Car Parking System",
    description:
      "Full-stack parking management system with role-based dashboards for admins, service providers, and users. Features real-time slot tracking, multiple vehicle support, and Redux state management.",
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "Tailwind CSS",
      "JWT",
      "RBAC",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/car-parking",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://park-your-car.vercel.app",
        icon: CgWebsite,
        type: "website",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "Telegram Web3 Zone Bot",
    description:
      "Telegram bot for Web3 ecosystem interactions with modular architecture. Features aiogram framework, environment validation, custom handlers, and Docker deployment support.",
    technologies: [
      "Python",
      "aiogram",
      "Telegram Bot API",
      "Docker",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/tg_web3_zone",
        icon: FaGithub,
        type: "github",
      },
    ],
  },
  {
    project: "Stader Staking Platform",
    description:
      "Cryptocurrency staking platform on Goerli Testnet enabling users to stake, unstake, and withdraw ETH. Integrates with blockchain smart contracts via Ethers.js with React frontend.",
    technologies: [
      "React.js",
      "Ethers.js",
      "Solidity",
      "React Context API",
      "CSS",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/blockchain-learning-week-6",
        icon: FaGithub,
        type: "github",
      },
    ],
  },
  {
    project: "LeCal Telegram Bot",
    description:
      "Telegram chatbot automating group moderation with ban/mute capabilities and real-time dynamic content triggers. Features Docker deployment and third-party API integrations.",
    technologies: ["Python", "Telegram Bot API", "Docker"],
    links: [
      {
        link: "https://github.com/bharatbhusal/lecal",
        icon: FaGithub,
        type: "github",
      },
    ],
  },
  {
    project: "Semester Routine Manager",
    description:
      "Class schedule and faculty contact management application with easily replaceable components. Features responsive design and React Router navigation.",
    technologies: ["React.js", "CSS", "React Router"],
    links: [
      {
        link: "https://github.com/bharatbhusal/semester-routine",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://semester-routine.vercel.app/",
        icon: CgWebsite,
        type: "website",
      },
    ],
  },
  {
    project: "Whale Games",
    description:
      "Crypto wallet-integrated gambling game using Terra blockchain SDK for seamless on-chain transactions. Features React frontend with Terra SDK integration.",
    technologies: [
      "React.js",
      "Node.js",
      "Terra SDK",
      "React Context API",
      "React Router",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/whale-game-dashboard",
        icon: FaGithub,
        type: "github",
      },
    ],
  },
  {
    project: "Imagine Image",
    description:
      "AI image generation platform using OpenAI DALL-E API to create images from text prompts. Full-stack application with Node.js backend and React frontend.",
    technologies: ["React.js", "Node.js", "OpenAI API", "CSS"],
    links: [
      {
        link: "https://github.com/bharatbhusal/ai-image-generator",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://imagine-image.vercel.app",
        icon: CgWebsite,
        type: "website",
      },
    ],
  },
  {
    project: "Function Selector",
    description:
      "Solidity function selector extraction tool for smart contract development. Computes function selectors from function signatures using keccak256 hashing.",
    technologies: ["React.js", "Tailwind CSS", "Vite", "js-sha3"],
    links: [
      {
        link: "https://github.com/bharatbhusal/function_selector",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://solidity-function-selector.vercel.app",
        icon: CgWebsite,
        type: "website",
      },
    ],
  },
  {
    project: "Stopwatch",
    description:
      "Interactive and responsive stopwatch application with React Context API for state management. Features Email.js integration for sharing results.",
    technologies: ["React.js", "CSS", "React Context API", "Email.js"],
    links: [
      {
        link: "https://github.com/bharatbhusal/stopwatch",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://meow-stopwatch.vercel.app/",
        icon: CgWebsite,
        type: "website",
      },
    ],
  },
  {
    project: "Truth and Dare",
    description:
      "Interactive party game for groups with truth and dare challenges. Integrates third-party APIs for dynamic question generation.",
    technologies: ["React.js", "Third-party APIs", "CSS"],
    links: [
      {
        link: "https://github.com/bharatbhusal/truth-or-dare",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://truth-and-dare.vercel.app",
        icon: CgWebsite,
        type: "website",
      },
    ],
  },
];

export default projectsData;
