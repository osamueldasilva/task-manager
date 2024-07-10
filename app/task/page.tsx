import { Metadata } from "next";
import ButtonNavigate from "../components/button-navigate";
import { fetcher } from "@/lib/request";
import Boards from "../components/boards";
import { Task } from "@/types/request";

export const metadata: Metadata = {
  title: "Board",
};

export default async function TaskPage() {
  const { data } = await fetcher<Task>({ url: "/api/task", tag: "get-task" });

  return (
    <main>
      <header className="px-6">
        <ButtonNavigate value="Nova tarefa" />
      </header>
      <div className="grid grid-cols-3 gap-2 p-2">
        <Boards task={data.task} />
      </div>
    </main>
  );
}
