import { Metadata } from "next";
import { FormEditTask } from "./form";
import { RequestParameters } from "@/types/general";
import { mockTaskList } from "@/app/mocks/teste";
import { Task } from "@/types/request";
import { fetcher } from "@/lib/request";

export const metadata: Metadata = {
  title: "Editar Tarefa",
};

export default async function EditTask({ params }: RequestParameters) {
  const { data } = await fetcher<Task>({ url: "/api/task", tag: "get-task" });
  const response = data.task.find((vl) => vl.id === parseInt(params.id));
  return (
    <main className="flex flex-col items-center px-4 py-3 md:px-8 lg:px-16">
      <section className="w-full max-w-4xl">
        <header className="w-full flex justify-center mb-8">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              Editar tarefa
            </h1>
            <p className="text-gray-500 mt-2 sm:text-md lg:text-lg">
              Preencha os campos abaixo para editar a tarefa existente.
              Certifique-se de fornecer todas as informações necessárias para
              garantir que a tarefa seja atualizada conforme suas necessidades.
            </p>
          </div>
        </header>

        <section className="flex justify-center">
          <FormEditTask data={response} />
        </section>
      </section>
    </main>
  );
}
