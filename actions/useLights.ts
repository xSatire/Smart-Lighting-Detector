"use server";

import {
  getGroupAndLightsByRegion,
  getGroupByRegionId,
  getLightsByGroupId,
  getLightsById,
  getLightsByRegionName,
} from "@/data/lights";
import { db } from "@/lib/db";

export const onSelectRegion = async (region: string) => {
  if (region == "all") {
    const group = await getGroupAndLightsByRegion(region);
    console.log(group);
    return group;
  } else {
    const group = await getGroupByRegionId(region);
    return group;
  }
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
