"use client";

import { motion } from "framer-motion";

interface RightSectionProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const sections = [
  {
    title: "About Me",
    content:
      "I'm a full stack developer with a passion for creating intuitive and dynamic user experiences...",
  },
  {
    title: "Skills",
    content: "JavaScript, React, Node.js, Python, SQL, MongoDB, AWS...",
  },
  {
    title: "Projects",
    content:
      "E-commerce platform, Social media dashboard, Machine learning model for predictive analytics...",
  },
  {
    title: "Experience",
    content:
      "Senior Developer at Tech Co. (2018-Present), Web Developer at StartUp Inc. (2015-2018)...",
  },
  {
    title: "Education",
    content: "BS in Computer Science, University of Technology (2011-2015)",
  },
];

export default function RightSection({ scrollRef }: RightSectionProps) {
  return (
    <motion.div
      ref={scrollRef}
      className="h-screen w-1/2 overflow-y-auto bg-gray-100"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          className="section h-screen flex flex-col justify-center p-12 bg-white sticky top-0"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {section.title}
          </h2>
          <p className="text-gray-600">{section.content}</p>
        </div>
      ))}
    </motion.div>
  );
}
