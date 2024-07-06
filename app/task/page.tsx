import { Metadata } from "next";
import ButtonNavigate from "../components/button-navigate";
import { mockTaskList } from "../mocks/teste";
import { CardTasks } from "../components/card-task";
import Boards from "../components/boards";

export const metadata: Metadata = {
  title: "Board",
};

export default function Task() {
  const response = mockTaskList;

  return (
    <main>
      <header className="">
        <ButtonNavigate value="Nova tarefa" />
      </header>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Boards task={response} />
      </div>
    </main>
  );
}
