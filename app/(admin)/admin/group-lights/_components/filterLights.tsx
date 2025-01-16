"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/constant";
import {
  onSelectRegion,
  serverGetLightsFromGroupId,
  serverGetLightsFromRegion,
} from "@/actions/useLights";
import LightTable from "./lightTable";
import { url_route } from "@/route";
import { Button } from "@/components/ui/button";

interface groupDataProps {
  groupId: string;
  groupName: string;
  regionId: string;
}

interface lightsDataProps {
  lightsId: string;
  name: string;
  lightsGroupId: string;
  lightsRegion: string;
  status: boolean;
  group: {
    groupName: string;
  };
}

const FilteredLights = () => {
  // Include onRegionSelect
  const [region, setRegion] = useState("");
  const [groupData, setGroupData] = useState<groupDataProps[]>([]);
  const [group, setGroup] = useState("");
  const [data, setData] = useState<lightsDataProps[]>([]);

  useEffect(() => {
    if (region) {
      onSelectRegion(region).then((res) => {
        if (res) {
          console.log(res);
          setGroupData(res);
        }
      });
    }
  }, [region]);

  const handleGroupChange = async (datas: string) => {
    setGroup(datas);
    if (datas == "all") {
      const regionName = REGIONS.filter(
        (regionData) => regionData.id == region
      );
      console.log(regionName[0].name);
      const result = await serverGetLightsFromRegion(regionName[0].name);
      if (result) {
        setData(result);
      }
      console.log(result);
    } else {
      const result = await serverGetLightsFromGroupId(datas);
      console.log(result);
      if (result) {
        setData(result);
      }
    }
  };

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
      }
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  const handleMassSwitch = async (
    data: lightsDataProps[],
    message: boolean
  ) => {
    Promise.all(
      data.map(async (dat) => {
        await handleLightSwitch(dat.lightsId, message);
      })
    );
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <p className="text-2xl font-semibold">Lights Database</p>
      </div>
      <div className="flex justify-start items-center space-x-4">
        <div className="space-y-2">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem value={region.id} key={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {region && groupData && (
          <div className="space-y-2">
            <Select value={group} onValueChange={handleGroupChange}>
              <SelectTrigger id="group">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {groupData.map((group) => (
                  <SelectItem value={group.groupId} key={group.groupId}>
                    {group.groupName}
                  </SelectItem>
                ))}
                <SelectItem value={"all"}>All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {data.length !== 0 && (
          <div className="flex items-center justify-end gap-x-4">
            <Button
              onClick={() => handleMassSwitch(data, false)}
              className="bg-stone-600"
            >
              Switch Off All Lights
            </Button>
            <Button
              onClick={() => handleMassSwitch(data, true)}
              variant={"outline"}
            >
              Switch On All Lights
            </Button>
          </div>
        )}
      </div>
      {data && <LightTable lightsData={data} />}
    </div>
  );
};

export default FilteredLights;
