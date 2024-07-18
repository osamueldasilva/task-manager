import { fetcher } from "@/lib/request";
import { ContentCommentTask } from "./content-comment-task";
import { Comments, ObjectComments } from "@/types/request";

export default async function ContentModalComments({
  taskId,
  data,
}: {
  taskId: number;
  data: ObjectComments[];
}) {
  return (
    <>
      <ContentCommentTask taskId={taskId} comments={data} />
    </>
  );
}
