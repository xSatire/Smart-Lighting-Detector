"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface LeftSectionProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function LeftSection({ scrollRef }: LeftSectionProps) {
  return (
    <motion.div
      ref={scrollRef}
      className="h-screen w-1/2 bg-gray-900 text-white p-12 flex flex-col overflow-y-auto"
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <div className="sticky top-0 pb-12">
        <Image
          src="/placeholder.svg?height=150&width=150"
          width={150}
          height={150}
          alt="Profile"
          className="rounded-full mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">John Doe</h1>
        <h2 className="text-xl text-gray-400 mb-6">Full Stack Developer</h2>
        <p className="text-gray-300 mb-6">
          Passionate about creating beautiful and functional web applications.
          With 5 years of experience in both front-end and back-end development.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
