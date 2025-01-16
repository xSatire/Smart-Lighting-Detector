"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serverGetDataFromRegionId, updateStatus } from "@/actions/useLights";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { url_route } from "@/route";
import { Lightbulb } from "lucide-react";

interface regionDataProps {
  group: {
    lights: {
      lightsId: string;
      name: string;
      status: boolean;
    }[];
    groupId: string;
    groupName: string;
  }[];
  id: string;
  regionName: string;
  path: string;
}

interface lightCountsProps {
  regionId: string;
  regionName: string;
  lightCount: number;
}

export default function Map() {
  const [selectedSection, setSelectedSection] =
    useState<regionDataProps | null>(null);
  const [sectionData, setSectionData] = useState<regionDataProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await serverGetDataFromRegionId();
      setSectionData(result);
    };
    getData();
  }, []);

  function handleSectionClick(section: regionDataProps) {
    setSelectedSection(section);
  }

  function getTextX(sectionId: string) {
    if (
      sectionId === "cm5di5kpv0000hrs9vxm6ik5e" ||
      sectionId === "cm5di5kpw0002hrs9ert0q33p"
    ) {
      return 70;
    } else {
      return 270;
    }
  }

  const lightCounts = (data: regionDataProps) => {
    let count = 0;
    data.group.forEach((group) => {
      count += group.lights.filter((light) => light.status == true).length;
    });
    return count;
  };
  const lightTotal = (data: regionDataProps) => {
    let count = 0;
    data.group.forEach((group) => {
      count += group.lights.length;
    });
    return count;
  };

  function getTextY(sectionId: string) {
    if (
      sectionId === "cm5di5kpv0000hrs9vxm6ik5e" ||
      sectionId === "cm5di5kpw0001hrs9k7thwmi5"
    ) {
      return 50;
    } else {
      return 150;
    }
  }

  const handleLightSwitch = async (deviceId: string, message: boolean) => {
    //Remember cannot use server to send api requests
    const url = `${url_route}/api/lighting-detector/${deviceId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message), //Message is true or false
      });
      if (!response.ok) {
        throw new Error("Failed to send alert");
      } else {
        console.log("sent");
        await updateStatus(deviceId, message);
      }
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Station Overview</CardTitle>
        <CardDescription>
          Click on a section to view more information
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sectionData.length !== 0 ? (
          <div className="mb-8">
            <svg viewBox="0 0 400 200" className="w-full h-auto">
              {sectionData.map(function (section: regionDataProps) {
                return (
                  <path
                    key={section.id}
                    d={section.path}
                    stroke="black"
                    strokeWidth="2"
                    className={cn(
                      "cursor-pointer hover:opacity-100 transition-opacity fill-yellow-300",
                      lightCounts(section) > 3
                        ? "opacity-90"
                        : lightCounts(section) > 1
                        ? "opacity-35"
                        : "opacity-15"
                    )}
                    onClick={function () {
                      handleSectionClick(section);
                    }}
                  />
                );
              })}
              {sectionData.map(function (section) {
                return (
                  <text
                    key={"text-" + section.id}
                    x={getTextX(section.id)}
                    y={getTextY(section.id)}
                    textAnchor="middle"
                    fill="black"
                    fontSize="9"
                    className="pointer-events-none"
                  >
                    {section.regionName}
                  </text>
                );
              })}
            </svg>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {selectedSection && (
          <div className="w-full p-6 space-y-6">
            <div className="font-semibold text-2xl">
              {selectedSection.regionName}
            </div>
            <div className="gap-x-2 flex justify-start items-center">
              <Lightbulb />
              <p>Total Number Of Lights: {lightTotal(selectedSection)}</p>
            </div>
            <div className="gap-x-2 flex justify-start items-center">
              <Lightbulb fill="yellow" />
              <p>Lights That Are On: {lightCounts(selectedSection)}</p>
            </div>

            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Command</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSection.group.map((indivGroup) =>
                  indivGroup.lights.map((alert) => (
                    <TableRow key={alert.lightsId}>
                      <TableCell>{alert.name}</TableCell>
                      <TableCell>
                        {alert.status ? "Light is On" : "Light is Off"}
                      </TableCell>
                      <TableCell className="flex items-center space-x-4">
                        <Button
                          onClick={() =>
                            handleLightSwitch(alert.lightsId, false)
                          }
                        >
                          Switch off
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            handleLightSwitch(alert.lightsId, true)
                          }
                        >
                          Switch on
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
