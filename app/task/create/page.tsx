import { Metadata } from "next";
import { FormCreateTask } from "./form";

export const metadata: Metadata = {
  title: "Criar Nova Tarefa",
};

export default function CreateTask() {
  return (
    <main>
      <section>
        <header className="w-full flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Criar nova tarefa</h1>
            <p className="text-gray-500">
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
