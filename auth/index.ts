import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { userService } from "./userService";

import AccountUserModel from "@/mongodb/models/AccountUser";
import { connectDB } from "@/mongodb";
import { logger } from "@/services/logger";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
        await connectDB();
        const user = await AccountUserModel.findById(account.providerAccountId);

        token.name = user?.name || "";
        token.admin = user?.admin || false;
        logger.info(`User: ${token.name} just generated a new JWT`, { user });
      }

      return token;
    },
    async session({ session, token }) {
      session.user._id = token.userId;
      session.user.name = token.name;
      session.user.admin = token.admin;

      logger.info(`User: ${token.name} just generated a new session`, {
        user: session.user,
        session: {
          expires: session.expires,
          token: token,
        },
      });

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        return userService.authenticate(username, password);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
