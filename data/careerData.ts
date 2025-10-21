"use client";
import { FaGamepad, FaTelegram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { CareerItem } from "@/types";

const careerData: CareerItem[] = [
  {
    company: "Kanine Klans",
    role: "Blockchain Engineer",
    duration: "Apr 2025 - Aug 2025",
    address: "Remote",
    description: `MASTER THE ELEMENTS, DOMINATE MARS! Strategize Your Moves. Explore Uncharted Land, And Rise To Supremacy On The Red Planet.`,
    achievements: [
      "Single handedly built the main website in 1 week using Next.js.",
      "Built a robust system(Postgresql, Node.js, AWS EC2, Github Actions, AWS ECR) that helps integrate Diamante Blockchain with any web2 projects. A system with multiple authentication options, dashboard stats and multiple clients support.",
      "Managed and optimized the AWS cloud services like route53, ec2, amplify, IAM, SSL, Cloudfront, etc.",
    ],
    links: [
      {
        link: "https://www.kaninekalns.com/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://x.com/KanineKlans",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://t.me/Kanineklans",
        icon: FaTelegram,
        type: "telegram",
      },
    ],
  },
  {
    company: "jaisriram",
    role: "Fullstack Blockchain Developer",
    duration: "Oct 2024 - Apr 2025",
    address: "Remote",
    description: `Embark on a transformative journey with $JSR, evolving from a devoted seeker to the enlightened master of "Chant-to-Earn."`,
    achievements: [
      "Led the development and successful launch of the company website within 30 days of joining.",
      "Directed a team of developers to deliver a Telegram mini-game(Next.js, Node.js, Postgresql, Github Actions, AWS Amplify) within 60 days, ensuring smooth deployment and timely execution.",
      "Streamlined and structured the company's technical operations by consolidating scattered development efforts.",
      "Independently integrated Ouroboro blockchain(Layer 3 deployed through conduit)  and account abstraction using the Thirdweb SDK, enhancing blockchain interoperability and user experience.",
      "Built a telegram bot in typescript for moderation and user engagement.",
      "Built and deployed over 10 smart contracts on Ourboro chain. Smart contracts like Lottery System, NFT, Token, etc.",
    ],
    links: [
      {
        link: "https://www.jaisriram.io/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://x.com/jsr_coin",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://t.me/jaisriram_io_community",
        icon: FaTelegram,
        type: "telegram",
      },

      {
        link: "https://t.me/jaisriram_io_bot/game",
        icon: FaGamepad,
        type: "game",
      },
    ],
  },
  {
    company: "Router Protocol",
    role: "Community Manager",
    duration: "Oct 2023 - Feb 2025",
    address: "Remote",
    description:
      "Bridging blockchain ecosystems to onboard the next billion users into Web3 by eliminating blockchain fragmentation.",
    achievements: [
      "Research and weekly presentation about interoperability news on the web3 space.",
      "Discord & Telegram bot optimisation & task automation along with smooth community engagement.",
      "Built websites and tools to help fellow moderators and community managers.",
    ],
    links: [
      {
        link: "https://www.routerprotocol.com/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://x.com/routerprotocol",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://t.me/routerprotocol",
        icon: FaTelegram,
        type: "telegram",
      },
    ],
  },
  {
    company: "0xCommit",
    role: "Security Auditor and Community Manager",
    duration: "Feb 2024 - Oct 2024",
    address: "Remote",
    description:
      "Enhancing the security of decentralized systems through comprehensive smart contract audits.",
    achievements: [
      "Conducted independent and collaborative audits of over 20 client’s smart contracts.",
      "Prepared more than 20 detailed audit reports with clear, concise explanations of identified vulnerabilities.",
      "Established a new community centered on smart contract security and audits. In 1 week successfully gathered 20+ genuine security enthusiasts.",
      "Consistently created and shared around 21 educational content per week, including articles and social media updates.",
      "Curated weekly and monthly web3 security hack analysis reports.",
    ],
    links: [
      {
        link: "https://0xcommit.com",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://x.com/0xcommitaudits",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://t.me/OxCommitAudits",
        icon: FaTelegram,
        type: "telegram",
      },
    ],
    highlight: "PINNED",
  },
  {
    company: "Terraform Labs",
    role: "Community Moderator",
    duration: "Sept 2021 - Aug 2023",
    address: "Remote",
    description:
      "Supporting a passionate community and developer ecosystem to drive innovation within the Terra blockchain network.",
    achievements: [
      "Discord & Telegram bot optimisation & task automation along with smooth community engagement.",
      "Consistent watch to the community to maintain code of conduct.",
      "Help new members of the community to understand TFL tech better.",
    ],
    links: [
      {
        link: "https://www.terra.money/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://x.com/terra_money",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://t.me/TerraNetworkLobby",
        icon: FaTelegram,
        type: "telegram",
      },
    ],
  },
];
export default careerData;
