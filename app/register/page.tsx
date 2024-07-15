import React from "react";
import FormRegister from "./assets/components/form-register";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function PageRegister() {
  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <h2 className={`text-3xl font-bold mb-4 ${quicksand.className}`}>
        Registre-se ao TaskMaster!
      </h2>
      <div className="w-full flex justify-center">
        <FormRegister />
      </div>
    </div>
  );
}
