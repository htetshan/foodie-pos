import { config } from "@/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleId,
      clientSecret: config.googleSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
};

export default NextAuth(authOptions);
