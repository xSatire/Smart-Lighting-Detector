"use server";

import z from "zod";
import { registerSchema } from "@/schema";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { randomUUID } from "crypto";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, name, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Account already exist" };
  }
  const uuid = randomUUID();

  await db.user.create({
    data: {
      id: uuid,
      email,
      name,
      password: hashedPassword,
    },
  });
  await db.lights.create({
    data: {
      lightsId: uuid,
      lightsGroupId: "cm5yqml1c000031mzvs12ieyo",
      lightsRegion: "King Albert Park Station",
    },
  });
  return { success: "User Created" };
};
