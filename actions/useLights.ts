"use server";

import { getGroupByRegionId } from "@/data/lights";
import { db } from "@/lib/db";

export const onSelectRegion = async (region: string) => {
  const group = await getGroupByRegionId(region);
  console.log(group);
  return group;
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
