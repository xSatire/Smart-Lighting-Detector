import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true; //stop checking if using provider

      const existingUser = await getUserById(user.id as string);
      //Prevent sign in without email verification
      // if (!existingUser?.emailVerified) {
      //   return false;
      // }
      return true;
    },

    async session({ token, session }) {
      if (session.user && token.role) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token }) {
      //if no id means it is logged out
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token; //if user does not exist
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
