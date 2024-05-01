import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schema";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }
          const checkPassword = await bcrypt.compare(password, user.password);

          if (checkPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
