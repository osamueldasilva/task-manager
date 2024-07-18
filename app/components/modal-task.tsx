import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Comments, ObjectComments, ObjectTask } from "@/types/request";
import ContentModalComments from "./content-modal";

export default async function ModalTask({
  data,
  comments,
}: {
  data: ObjectTask;
  comments: ObjectComments[];
}) {
  const verifyData = comments?.filter((value) => value.taskId === data.id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full h-fit py-1">
          Visualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-100px)]">
        <main className="">
          <DialogHeader>
            {data.title}
            <DialogDescription>{data.description}</DialogDescription>
          </DialogHeader>

          <ContentModalComments taskId={data.id} data={verifyData} />
        </main>
      </DialogContent>
    </Dialog>
  );
}
