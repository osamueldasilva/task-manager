import { Metadata } from "next";
import { FormCreateTask } from "./form";

export const metadata: Metadata = {
  title: "Criar Nova Tarefa",
};

export default function CreateTask() {
  return (
    <main className="flex flex-col items-center px-4 py-3 md:px-8 lg:px-16">
      <section className="w-full max-w-4xl">
        <header className="w-full flex justify-center mb-8">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              Criar nova tarefa
            </h1>
            <p className="text-gray-500 mt-2 sm:text-md lg:text-lg">
              Preencha os campos abaixo para criar um novo formulário.
              Certifique-se de fornecer todas as informações necessárias para
              garantir que o formulário atenda às suas necessidades.
            </p>
          </div>
        </header>

        <section className="flex justify-center">
          <FormCreateTask />
        </section>
      </section>
    </main>
  );
}
