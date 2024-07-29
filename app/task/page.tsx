import { Metadata } from "next";
import ButtonNavigate from "../components/button-navigate";
import { fetcher } from "@/lib/request";
import Boards from "../components/boards";
import ButtonSignout from "../components/button-signout";
import { Comments, Task } from "@/types/request";

export const metadata: Metadata = {
  title: "Board",
};

export default async function TaskPage() {
  const { data, error } = await fetcher<Task>({ url: "/api/task" });

  return (
    <main className="animate-fadeIn">
      {!error ? (
        <>
          <header className="px-6">
            <ButtonNavigate value="Nova tarefa" />
          </header>
          <div className="grid grid-cols-3 max-sm:gap-0 gap-2 p-2 max-sm:flex max-sm:flex-col">
            <Boards data={data.tasks} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center gap-2 flex-col h-96">
          <p className="text-yellow-400">{error?.message}</p>
          <ButtonSignout />
        </div>
      )}
    </main>
  );
}
