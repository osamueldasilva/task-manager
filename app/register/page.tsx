import React from "react";
import FormRegister from "./assets/components/form-register";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function PageRegister() {
  return (
    <section className="flex">
      <div className="w-full h-screen flex max-md:flex-col justify-center items-center max-md:bg-gradient-to-r max-md:from-blue-600">
        <div className="hidden max-md:flex animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-6 ${quicksand.className}`}>
            Bem-vindo ao TaskMaster!
          </h2>
        </div>
        <div className="w-full flex justify-center flex-col items-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4">Registre-se</h2>
          <FormRegister />
        </div>
        <div className="w-full h-full bg-gradient-to-l from-blue-600 flex justify-center flex-col items-center max-md:hidden animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-4 ${quicksand.className}`}>
            Bem-vindo ao TaskMaster!
          </h2>
          <p className="text-lg mb-8 text-center px-4 max-md:hidden">
            Crie sua conta no TaskMaster para começar a organizar suas tarefas
            de forma eficiente. Defina prioridades, acompanhe o progresso e
            garanta que nada fique para trás.
          </p>
        </div>
      </div>
    </section>
  );
}
