import React from "react";
import FormLogin from "./assets/components/form-login";
import { Quicksand } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function PageLogin() {
  return (
    <section className="flex">
      <SpeedInsights />
      <div className="w-full h-screen flex max-md:flex-col justify-center items-center max-md:bg-gradient-to-r max-md:from-blue-600">
        <div className="w-full h-full bg-gradient-to-r from-blue-600 flex justify-center flex-col items-center max-md:hidden animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-4 ${quicksand.className}`}>
            Bem-vindo ao TaskMaster!
          </h2>
          <p className="text-lg mb-8 text-center px-4 max-md:hidden">
            O TaskMaster é seu aliado na organização e gestão de tarefas.
            Facilite seu dia a dia, definindo prioridades e garantindo que nada
            fique para trás.
          </p>
        </div>
        <div className="hidden max-md:flex animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-6 ${quicksand.className}`}>
            Bem-vindo ao TaskMaster!
          </h2>
        </div>
        <div className="w-full flex justify-center flex-col items-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <FormLogin />
        </div>
      </div>
    </section>
  );
}
