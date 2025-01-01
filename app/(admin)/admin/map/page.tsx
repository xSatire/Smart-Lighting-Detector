"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionInfo {
  id: string;
  name: string;
  description: string;
  path: string;
  color: string;
}

const sections: SectionInfo[] = [
  {
    id: "section1",
    name: "North Wing",
    description:
      "The North Wing houses our research and development department. It features state-of-the-art laboratories and collaborative spaces for our scientists and engineers.",
    path: "M0,0 L200,0 L180,100 L20,80 Z",
    color: "#FFB3BA",
  },
  {
    id: "section2",
    name: "East Wing",
    description:
      "The East Wing is home to our administrative offices and conference rooms. It's designed for efficient management and productive meetings.",
    path: "M200,0 L400,0 L400,100 L180,100 Z",
    color: "#BAFFC9",
  },
  {
    id: "section3",
    name: "South Wing",
    description:
      "The South Wing contains our manufacturing facilities. It's equipped with the latest production technology to ensure high-quality output.",
    path: "M20,80 L180,100 L200,200 L0,200 Z",
    color: "#BAE1FF",
  },
  {
    id: "section4",
    name: "West Wing",
    description:
      "The West Wing is dedicated to employee wellness and recreation. It includes a gym, cafeteria, and relaxation areas to promote work-life balance.",
    path: "M180,100 L400,100 L400,200 L200,200 Z",
    color: "#FFFFBA",
  },
];

export default function Map() {
  const [selectedSection, setSelectedSection] = useState<SectionInfo | null>(
    null
  );

  function handleSectionClick(section: SectionInfo) {
    setSelectedSection(section);
  }

  function getTextX(sectionId: string) {
    if (sectionId === "section1" || sectionId === "section3") {
      return 70;
    } else {
      return 270;
    }
  }

  function getTextY(sectionId: string) {
    if (sectionId === "section1" || sectionId === "section2") {
      return 50;
    } else {
      return 150;
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Station Overview</CardTitle>
        <CardDescription>
          Click on a section to view more information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            {sections.map(function (section: SectionInfo) {
              return (
                <path
                  key={section.id}
                  d={section.path}
                  fill={section.color}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={function () {
                    handleSectionClick(section);
                  }}
                />
              );
            })}
            {sections.map(function (section) {
              return (
                <text
                  key={"text-" + section.id}
                  x={getTextX(section.id)}
                  y={getTextY(section.id)}
                  textAnchor="middle"
                  fill="black"
                  fontSize="14"
                  className="pointer-events-none"
                >
                  {section.name}
                </text>
              );
            })}
          </svg>
        </div>
        {selectedSection && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">
              {selectedSection.name}
            </h3>
            <p>{selectedSection.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
