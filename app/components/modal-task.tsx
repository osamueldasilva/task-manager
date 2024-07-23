"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ObjectComments, ObjectTask } from "@/types/request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ContentCommentTask } from "./content-comment-task";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft, Loader } from "lucide-react";
import { useTransition } from "react";

export default function ModalTask({
  data,
  comments,
}: {
  data?: ObjectTask;
  comments: ObjectComments[];
}) {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!data) {
    toast.warning("Tarefa inexistente!");
    push("/task");
    return null;
  }

  const verifyData = comments?.filter((value) => value.taskId === data?.id);

  return (
    <Dialog modal open>
      <DialogContent
        closeButton={
          <Button
            onClick={() =>
              startTransition(() => {
                push("/task");
              })
            }
            className="flex gap-1"
            variant={"ghost"}
          >
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin ease-in-out duration-1000" />
            ) : (
              <ArrowLeft className="w-4 h-4" />
            )}
            Voltar
          </Button>
        }
        className="max-h-[calc(100vh-100px)] max-w-[95%] sm:max-w-[95%] md:max-w-[70%] lg:max-w-[60%]"
      >
        <DialogHeader>
          <h2 className="text-lg font-bold">{data?.title}</h2>
          <DialogDescription>{data?.description}</DialogDescription>
        </DialogHeader>

        <ContentCommentTask taskId={data?.id} comments={verifyData} />
      </DialogContent>
    </Dialog>
  );
}
