import { db } from "@/lib/db";
//get Lights By Group
//get Groups By Region
//Get Status

export const getLightsById = async (id: string) => {
  try {
    const lights = await db.lights.findFirst({
      where: { lightsId: id },
    });
    return lights;
  } catch {
    return null;
  }
};

export const getLightsByName = async (name: string) => {
  try {
    const lights = await db.lights.findMany({
      where: { name: name },
      include: {
        group: {
          select: {
            groupName: true,
          },
        },
      },
    });
    return lights;
  } catch {
    return null;
  }
};

export const getLightsByGroupId = async (id: string) => {
  try {
    const lights = await db.lights.findMany({
      where: { lightsGroupId: id },
      include: {
        group: {
          select: {
            groupName: true,
          },
        },
      },
    });
    return lights;
  } catch {
    return null;
  }
};

export const getLightsByRegionName = async (regionName: string) => {
  try {
    const lights = await db.lights.findMany({
      where: { lightsRegion: regionName },
      include: {
        group: {
          select: {
            groupName: true,
          },
        },
      },
    });
    return lights;
  } catch {
    return null;
  }
};

export const getGroupAndLightsByRegion = async (id: string) => {
  try {
    const group = await db.region.findFirst({
      where: { id: id },
      include: {
        group: {
          select: {
            groupId: true,
            groupName: true,
            lights: {
              select: {
                lightsId: true,
                name: true,
                status: true,
              },
            },
          },
        },
      },
    });
  } catch {
    return null;
  }
};

export const getGroupByRegionId = async (id: string) => {
  try {
    const result = await db.group.findMany({
      where: { regionId: id },
    });
    return result;
  } catch {
    return null;
  }
};
