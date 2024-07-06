import { Metadata } from "next";
import ButtonNavigate from "../components/button-navigate";
import { mockTaskList } from "../mocks/teste";
import { CardTasks } from "../components/card-task";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Task() {
  const response = mockTaskList;

  const notStartedTasks = response.filter(
    (task) => task.status === "Não iniciado"
  );
  const inProgressTasks = response.filter(
    (task) => task.status === "Em andamento"
  );
  const completedTasks = response.filter((task) => task.status === "Concluído");

  return (
    <main>
      <header className="">
        <ButtonNavigate value="Nova tarefa" />
      </header>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Não Iniciado</h2>
          <CardTasks tasks={notStartedTasks} />
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Em Andamento</h2>
          <CardTasks tasks={inProgressTasks} />
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Concluído</h2>
          <CardTasks tasks={completedTasks} />
        </div>
      </div>
    </main>
  );
}
