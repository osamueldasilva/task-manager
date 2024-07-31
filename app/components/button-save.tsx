import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ButtonSave({
  isLoading,
  action,
  fn,
}: {
  isLoading: boolean;
  action: "add" | "alter";
  fn: () => void;
}) {
  const actionMessage = {
    add: {
      title: "Criar nova tarefa",
      description: "Por favor, confirme se realmente deseja criar esta tarefa.",
    },
    alter: {
      title: "Alterar tarefa",
      description:
        "Por favor, confirme se realmente deseja alterar esta tarefa.",
    },
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          className="bg-green-500 hover:bg-green-500/80 text-white w-full"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </DialogTrigger>
      <DialogContent closeButton>
        <DialogHeader>
          {actionMessage[action].title}
          <DialogDescription>
            {actionMessage[action].description}{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 w-full justify-end">
          <DialogClose>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button className="text-white" onClick={fn} isLoading={isLoading}>
              Salvar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
