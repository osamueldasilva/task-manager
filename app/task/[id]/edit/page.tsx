import { Metadata } from "next";
import { FormEditTask } from "./form";
import { RequestParameters } from "@/types/general";
import { mockTaskList } from "@/app/mocks/teste";

export const metadata: Metadata = {
  title: "Editar Tarefa",
};

export default function EditTask({ params }: RequestParameters) {
  const response = mockTaskList.find((task) => task.id === params.id);

  return (
    <main>
      <section>
        <header className="w-full flex justify-center">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="font-bold text-2xl">Editar Tarefa</h1>
            <p className="text-gray-500 mt-2">
              Preencha os campos abaixo para editar a tarefa existente.
              Certifique-se de fornecer todas as informações necessárias para
              garantir que a tarefa seja atualizada conforme suas necessidades.
            </p>
          </div>
        </header>

        <section className="flex justify-center mt-8">
          <FormEditTask data={response} />
        </section>
      </section>
    </main>
  );
}
