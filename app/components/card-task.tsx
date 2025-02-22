"use client";

import { Comments, ObjectComments, ObjectTask } from "@/types/request";
import { NavigateEdit } from "./button-navigate";
import { useState, useTransition } from "react";
import { CircleAlert } from "lucide-react";
import ModalConfirmDelete from "./modal-confirm-delete";

import ModalTask from "./modal-task";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SelectFormAlterStatus } from "./select-alter-task";

export function CardTasks({
  tasks,
  dragOverColumn,
}: {
  tasks: ObjectTask[];
  dragOverColumn: string | null;
}) {
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, taskId: number) {
    e.dataTransfer.setData("taskId", taskId.toString());

    setDraggingTaskId(taskId);
  }

  function handleDragEnd() {
    setDraggingTaskId(null);
  }

  const priorityOrder = {
    Alta: 1,
    Média: 2,
    Baixa: 3,
  };

  const sortedTask = tasks?.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  function renderPriorityBalls(priority: string) {
    switch (priority) {
      case "Alta":
        return (
          <div className="flex">
            <span className="inline-block h-2 w-2 rounded-full mr-1 bg-red-600"></span>
            <span className="inline-block h-2 w-2 rounded-full mr-1 bg-red-600"></span>
            <span className="inline-block h-2 w-2 rounded-full mr-1 bg-red-600"></span>
          </div>
        );
      case "Média":
        return (
          <div className="flex">
            <span className="inline-block h-2 w-2 rounded-full mr-1 bg-yellow-400"></span>
            <span className="inline-block h-2 w-2 rounded-full mr-1 bg-yellow-400"></span>
          </div>
        );
      case "Baixa":
        return (
          <span className="inline-block h-2 w-2 rounded-full mr-1 bg-green-600"></span>
        );
      default:
        return null;
    }
  }

  function handleNavigate(id: number) {
    startTransition(() => {
      push(`/task/${id}/modal`);
    });
  }

  return (
    <div className="mt-4 max-sm:mt-2 max-sm:flex gap-2 overflow-auto">
      {tasks?.length > 0 ? (
        sortedTask.map((task) => (
          <div
            key={task.id}
            className={`p-4 max-sm:min-w-80  max-sm:mb-0 cursor-pointer rounded-lg border hover:border-blue-700 hover:bg-blue-700/10 shadow mb-4 transition-all duration-300 ease-in ${
              draggingTaskId === task.id &&
              "border-2 border-blue-700 bg-blue-700/10"
            } ${dragOverColumn === task.status && "opacity-25"}`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-bold mb-2 truncate max-w-full">
                {task.title}
              </h3>
              <div className="mb-2 flex gap-1 items-center">
                <NavigateEdit id={task.id} />
                <ModalConfirmDelete id={task} />
              </div>
            </div>
            <p className=" mb-2 truncate">{task.description}</p>
            <div className="flex items-center justify-between mb-2 ">
              <p className="text-sm">Prioridade: {task.priority}</p>
              <div>{renderPriorityBalls(task.priority)}</div>
            </div>
            <p className="text-sm  mb-2">Data de conclusão: {task.dueDate}</p>

            <div className="mb-2 flex max-sm:flex-col gap-1 items-center">
              <SelectFormAlterStatus data={task} />
              <Button
                isLoading={isPending}
                variant={"outline"}
                onClick={() => handleNavigate(task.id)}
                className="w-full h-fit"
              >
                Visualizar
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col max-sm:hidden  max-sm:mt-0 justify-center mt-10 items-center md:flex-col lg:gap-12">
          <CircleAlert className="w-20 h-20 md:w-40 md:h-40 text-gray-400" />
          <p className="text-center md:text-left">
            Não possui itens nesta coluna.
          </p>
        </div>
      )}
    </div>
  );
}
