"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export default function ButtonSignout() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      className="text-white"
      isLoading={isPending}
      onClick={() =>
        startTransition(() => {
          signOut({ callbackUrl: "/login" });
        })
      }
    >
      Realizar login
    </Button>
  );
}
