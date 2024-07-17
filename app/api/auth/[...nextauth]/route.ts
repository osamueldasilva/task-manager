import NextAuth, { DefaultSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface JWT {
  id: string;
}

interface Session {
  user: JWT;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Username and password must be provided");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return {
              id: user.id.toString(),
              name: user.name ?? null,
              email: user.email ?? null,
              image: user.image ?? null,
              emailVerified: user.emailVerified ?? null,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            } as User;
          } else {
            return null;
          }
        } catch (error) {
          console.log("Erro ao autenticar usuário:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session, token }) => {
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
