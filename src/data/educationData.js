import {
	FaLinkedin,
	FaInstagram,
	FaFacebook,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";

const educationData = [
	{
		institution: "GITAM University",
		duration: "10/2021 - Present",
		address: "Hyderabad, India",
		cgpa: "9.14/10",
		links: [
			{
				link: "https://www.gitam.edu/",
				icon: CgWebsite,
				type: "website",
			},
			{
				link:
					"https://www.linkedin.com/school/gitam-deemed-university/",
				icon: FaLinkedin,
				type: "linkedin",
			},
			{
				link: "https://x.com/GITAMUniversity",
				icon: FaXTwitter,
				type: "twitter",
			},
			{
				link:
					"https://www.instagram.com/gitamdeemeduniversity/",
				icon: FaInstagram,
				type: "instagram",
			},
		],
		courses: [
			"Bachelor of Technology in Computer Science and Engineering",
		],
	},
	{
		institution: "Kathmandu World School",
		duration: "2019 - 2020",
		address: "Bhaktapur, Nepal",
		cgpa: "3.61/4",
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
		institution:
			"SOS Hermann Gmeiner Higher Secondary School",
		duration: "2017 - 2018",
		address: "Surkhet, Nepal",
		cgpa: "9.14/10",
		links: [
			{
				link: "https://www.soshgssurkhet.edu.np/",
				icon: CgWebsite,
				type: "website",
			},
			{
				link:
					"https://www.facebook.com/people/SOS-Hermann-Gmeiner-School-Surkhet/100083000935528/",
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
