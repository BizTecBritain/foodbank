import { DefaultSession } from "next-auth";

import { AccountUser } from "@/mongodb/AccountUser";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: AccountUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
