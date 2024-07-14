"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProviderSessionProps = {
  children: ReactNode;
};

export default function ProviderSession({ children }: ProviderSessionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
