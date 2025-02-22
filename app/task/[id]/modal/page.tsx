import ModalTask from "@/app/components/modal-task";
import { fetcher } from "@/lib/request";
import { RequestParameters } from "@/types/general";
import { Comments, Task } from "@/types/request";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function PageModal({ params }: RequestParameters) {
  const [commentsResponse, taskResponse] = await Promise.all([
    fetcher<Comments>({ url: "/api/comments" }),
    fetcher<Task>({ url: "/api/task" }),
  ]);

  const task = taskResponse.data.tasks.find(
    (task) => task.id === Number(params.id)
  );

  return (
    <div className="mb-2 flex gap-1 items-center animate-fadeIn">
      <SpeedInsights />
      <ModalTask
        data={task}
        comments={commentsResponse.data.comments?.toReversed()}
      />
    </div>
  );
}
