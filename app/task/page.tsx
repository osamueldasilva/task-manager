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
  const { data: response } = await fetcher<Comments>({
    url: "/api/comments",
  });

  return (
    <main>
      {!error ? (
        <>
          <header className="px-6">
            <ButtonNavigate value="Nova tarefa" />
          </header>
          <div className="grid grid-cols-3 gap-2 p-2">
            <Boards data={data.tasks} comments={response.comments} />
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
