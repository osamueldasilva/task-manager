"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ButtonNavigate({ value }: { value: string }) {
  const [isPending, starTransition] = useTransition();
  const { push } = useRouter();

  function handleNavigate() {
    starTransition(() => {
      push("/task/create");
    });
  }

  return (
    <Button onClick={handleNavigate} isLoading={isPending}>
      {value}
    </Button>
  );
}
