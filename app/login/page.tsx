import React from "react";
import FormLogin from "./assets/components/form-login";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function PageLogin() {
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <h2 className={`text-3xl font-bold mb-4 ${quicksand.className}`}>
        Bem-vindo ao TaskMaster!
      </h2>
      <div className="w-full flex justify-center">
        <FormLogin />
      </div>
    </div>
  );
}
