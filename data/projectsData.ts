import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { ProjectItem } from "@/types";

const projectsData: ProjectItem[] = [
  {
    project: "Portfolio Website",
    description:
      "A modern Next.js portfolio with macOS-inspired design, GitHub stats integration, and responsive UI. Features dark/light themes, vCard QR codes and NFC compliant.",
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
    project: "Track My Biryani",
    description:
      "Production-grade expense tracker with JWT cookie auth, expense/category CRUD, analytics dashboard with stacked bar charts, Cloudinary image uploads with client-side compression, data export (JSON), PWA installability, dark/light theme, and location maps via Leaflet. Built as a Next.js App Router monolith with Mongoose/MongoDB persistence, Zod validation, React Query caching, and GSAP page transitions.",
    technologies: [
      "Next.js 16",
      "TypeScript (strict)",
      "MongoDB",
      "Recharts",
      "Leaflet + react-leaflet",
      "Cloudinary",
      "PWA (manifest + apple-meta)",
      "lucide-react",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/expense-tracker",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://trackmybiryani.bharatbhusal.com",
        icon: CgWebsite,
        type: "website",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "Portfolio Neeta",
    description:
      "Full-stack portfolio site for Neeta Bhusal with public project gallery (search, filter, sort, pagination), multi-step logo design request form with localStorage auto-save and email notifications, admin CMS with JWT cookie auth, project CRUD with signed Cloudinary image uploads, request management with status tracking, GSAP scroll animations, dark/light theme, and public request status tracking. Built as a Next.js App Router monolith with Mongoose/MongoDB persistence, Zod validation, React Query caching, and a layered backend pattern (Route → Controller → Service → Repository → Model).",
    technologies: [
      "Next.js 16",
      "TypeScript (strict)",
      "MongoDB",
      "Cloudinary",
      "Nodemailer (SMTP)",
      "Vercel Analytics",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/portfolio-neeta",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://neetabhusal.vercel.app",
        icon: CgWebsite,
        type: "website",
      },
    ],
    highlight: "PINNED",
  },
  {
    project: "Weekends Plan",
    description:
      "Event aggregation platform that discovers, deduplicates, and displays tech/community events across India from Luma, Meetup, FOSS United, and Eventbrite. Features daily GitHub Actions ingestion pipeline, ISR caching, MongoDB storage, dark/light themes, and paginated grid/list views with date-sectioned timelines.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "MongoDB",
      "GitHub Actions",
      "lucide-react",
      "next-themes",
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/weekends-plan",
        icon: FaGithub,
        type: "github",
      },
      {
        link: "https://weekendsplan.bharatbhusal.com",
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
    ],
    links: [
      {
        link: "https://github.com/bharatbhusal/pockity",
        icon: FaGithub,
        type: "github",
      },
    ],
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
  },
  {
    project: "MoodSync",
    description:
      "A heartfelt full-stack Next.js app to log and share emotions. Built for a special friend—whenever, post your feelings here. Features secure authentication and emotion history.",
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
    ],
  },
  {
    project: "Telegram Web3 Zone Bot",
    description:
      "Telegram bot for Web3 ecosystem interactions with modular architecture for trading crypto tokens within telegram. Features aiogram framework, environment validation, custom handlers, and Docker deployment support.",
    technologies: ["Python", "aiogram", "Telegram Bot API", "Docker"],
    links: [
      {
        link: "https://github.com/bharatbhusal/tg_web3_zone",
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
