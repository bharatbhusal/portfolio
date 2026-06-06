import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import { EducationItem } from "@/types";

const educationData: EducationItem[] = [
  {
    institution: "GITAM University",
    duration: "Nov 2021 - Apr 2025",
    address: "Hyderabad, India",
    cgpa: "9.11/10 (Gold Medalist)",
    degree: "B.Tech in Computer Science & Engineering",
    description:
      "Specializing in Cybersecurity with focus on full-stack development, blockchain technologies, and secure application design. Active participant in hackathons and open-source contributions.",
    links: [
      {
        link: "https://www.gitam.edu/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://www.linkedin.com/school/gitam-deemed-university/",
        icon: FaLinkedin,
        type: "linkedin",
      },
      {
        link: "https://x.com/GITAMUniversity",
        icon: FaXTwitter,
        type: "twitter",
      },
      {
        link: "https://www.instagram.com/gitamdeemeduniversity/",
        icon: FaInstagram,
        type: "instagram",
      },
    ],
    courses: [
      "Cybersecurity",
      "Data Structures",
      "Algorithms",
      "Web Development",
      "Blockchain",
    ],
    highlight: "LATEST",
  },
  {
    institution: "Kathmandu World School",
    duration: "2019 - 2020",
    address: "Bhaktapur, Nepal",
    cgpa: "3.61/4",
    degree: "Higher Secondary Education (Science)",
    description:
      "Completed advanced studies in science stream with emphasis on physics, chemistry, and computer science. Developed strong analytical and problem-solving skills.",
    links: [
      {
        link: "https://kws.edu.np/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://www.instagram.com/kathmanduws/",
        icon: FaInstagram,
        type: "instagram",
      },
      {
        link: "https://www.facebook.com/KathmanduWS",
        icon: FaFacebook,
        type: "facebook",
      },
    ],
    courses: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English",
    ],
  },
  {
    institution: "SOS Hermann Gmeiner Higher Secondary School",
    duration: "2017 - 2018",
    address: "Surkhet, Nepal",
    degree: "Secondary Education (Science)",
    cgpa: "9.14/10",
    links: [
      {
        link: "https://www.soshgssurkhet.edu.np/",
        icon: CgWebsite,
        type: "website",
      },
      {
        link: "https://www.facebook.com/people/SOS-Hermann-Gmeiner-School-Surkhet/100083000935528/",
        icon: FaFacebook,
        type: "facebook",
      },
    ],
    courses: [
      "Science",
      "Mathematics",
      "English",
      "Social Studies",
      "Computer Science",
    ],
  },
];

export default educationData;
