import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
    maxAge: 30,
  },
  jwt: {
    maxAge: 30,
  },
  // session: {
  //   maxAge: 24 * 60 * 60,
  // },
  // jwt: {
  //   maxAge: 24 * 60 * 60,
  // },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🚀 ~ session ~ session:", session);
      session.user = token;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
