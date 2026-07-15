import type { Metadata } from "next";
import ResumeBuilder from "./components/ResumeBuilder";

export const metadata: Metadata = {
  title: "Resume Builder",
  description:
    "ATS-friendly resume builder tailored for blockchain, software engineering, and web3 roles.",
};

export default function ResumePage() {
  return <ResumeBuilder />;
}
