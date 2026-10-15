import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { anonymous } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  advanced: {
    database: {
      joins: true,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // guest users
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // https://better-auth.com/docs/plugins/anonymous#link-account
        // perform actions like moving the cart items from anonymous user to the new user
      },
    }),
    nextCookies(),
  ],
});
