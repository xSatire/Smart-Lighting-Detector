"use server";

import { REGIONS } from "@/constant";
import {
  getGroupAndLightsByRegion,
  getGroupByRegionId,
  getLightsByGroupId,
  getLightsById,
  getLightsByRegionName,
} from "@/data/lights";
import { db } from "@/lib/db";

export const onSelectRegion = async (region: string) => {
  const group = await getGroupByRegionId(region);
  return group;
};

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

const code = {
  0: "M0,0 L200,0 L180,100 L20,80 Z",
  1: "M200,0 L400,0 L400,100 L180,100 Z",
  2: "M20,80 L180,100 L200,200 L0,200 Z",
  3: "M180,100 L400,100 L400,200 L200,200 Z",
};

export const serverGetDataFromRegionId = async () => {
  const data: regionDataProps[] = [];
  await Promise.all(
    REGIONS.map(async (region, index) => {
      console.log(region.id);
      const result = await getGroupAndLightsByRegion(region.id);

      console.log(result);
      if (result) {
        data.push({ ...result, path: code[index as keyof typeof code] });
      }
    })
  );
  return data;
};

export const serverGetLightsFromRegion = async (regionName: string) => {
  const lights = await getLightsByRegionName(regionName);
  console.log(`Region Lights ${lights}`);
  return lights;
};

export const serverGetLightsFromGroupId = async (groupId: string) => {
  console.log(groupId);
  const lights = await getLightsByGroupId(groupId);
  console.log(`Group Lights ${lights}`);
  return lights;
};

export const updateLightsData = async (
  lightsId: string,
  lightsName: string,
  groupId: string
) => {
  await db.lights.update({
    where: { lightsId: lightsId },
    data: {
      name: lightsName,
      lightsGroupId: groupId,
    },
  });
};

export const updateStatus = async (lightsId: string, isLightsOn: boolean) => {
  await db.lights.update({
    where: { lightsId: lightsId },
    data: {
      status: isLightsOn,
    },
  });
};

export const serverGetLightsFromLightsId = async (lightsId: string) => {
  console.log(lightsId);
  const lights = await getLightsById(lightsId);
  console.log(`Group Lights ${lights}`);
  return lights;
};
