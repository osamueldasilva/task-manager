"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus, Edit, Loader } from "lucide-react";
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
    <Button
      onClick={handleNavigate}
      className="text-white"
      isLoading={isPending}
    >
      {!isPending && <CirclePlus className="mr-2 h-5 w-5" />}
      {value}
    </Button>
  );
}

export function NavigateEdit({ id }: { id: number }) {
  const [isPending, starTransition] = useTransition();
  const { push } = useRouter();
  function handleNavigate() {
    starTransition(() => {
      push(`/task/${id}/edit`);
    });
  }

  return (
    <>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Edit onClick={handleNavigate} className="h-4 w-4 cursor-pointer" />
      )}
    </>
  );
}
