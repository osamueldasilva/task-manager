import NextAuth, {
  DefaultSession,
  Session,
  NextAuthOptions,
  AuthOptions,
} from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;

      emailVerified: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;

    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
}

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date;
  createdAt: Date;
  updatedAt: Date;
}
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password must be provided");
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
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          } as User;
        } else {
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
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.emailVerified = token.emailVerified;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
      }
      return session;
    },
    async jwt({ ...props }) {
      if (props.user) {
        props.token.id = props.user.id;
      }
      return props.token;
    },
  },
};
