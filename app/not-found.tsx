"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

export default function NotFound() {
  const { push } = useRouter();
  const [pushTransition, setPushTransition] = useState(false);

  const handlePushClick = () => {
    setPushTransition(true);
    push("/task");
  };

  return (
    <>
      <section className=" h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="container flex items-center justify-center px-6 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <InfoIcon className="text-blue-500 w-10 h-10" />
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Página não encontrada
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              A página que você está procurando não existe.
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <Button
                isLoading={pushTransition}
                className="text-white"
                onClick={handlePushClick}
              >
                Me leve para o inicio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
