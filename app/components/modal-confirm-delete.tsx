"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleter } from "@/lib/request";
import { ObjectTask } from "@/types/request";
import { Loader, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useNavigation } from "react-day-picker";
import { toast } from "sonner";

export default function ModalConfirmDelete({ id }: { id: ObjectTask }) {
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const { data } = await deleter({
        url: "/api/task",
        pathName: "/task",

        body: id,
      });

      if (data.status === 200) {
        toast.success(data.message);
        refresh();
        return;
      }
    });
  }
  return (
    <Dialog>
      <DialogTrigger disabled={isPending}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2Icon className="h-4 w-4 cursor-pointer hover:text-red-500" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Deletar tarefa
          <DialogDescription>
            Por favor, confirme se realmente deseja deletar esta tarefa.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 w-full justify-end">
          <DialogClose>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={handleDelete}
              isLoading={isPending}
              className="text-white"
            >
              Salvar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
