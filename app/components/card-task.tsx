"use client";

import { Task } from "@/types/request";
import { NavigateEdit } from "./button-navigate";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function CardTasks({ tasks }: { tasks: Task[] }) {
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);

  const { toast } = useToast();
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, taskId: number) {
    e.dataTransfer.setData("taskId", taskId.toString());

    setDraggingTaskId(taskId);
  }

  function handleDragEnd() {
    setDraggingTaskId(null);
    toast({
      title: "handleDragEnd",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  }

  const priorityOrder = {
    Alta: 1,
    Média: 2,
    Baixa: 3,
  };

  const sortedTask = tasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="mt-4">
      {tasks.length > 0 ? (
        sortedTask.map((task) => (
          <div
            key={task.id}
            className={`p-4 cursor-pointer rounded-lg border hover:border-blue-700 hover:bg-blue-700/10 shadow mb-4 transition-transform duration-500 hover:scale-105 hover:translate-y-[-2px] ${
              draggingTaskId === task.id &&
              "border-2 border-blue-700 bg-blue-700/10"
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-bold mb-2 truncate max-w-full">
                {task.title}
              </h3>
              <div className="mb-2">
                <NavigateEdit id={task.id} />
              </div>
            </div>
            <p className=" mb-2">{task.description}</p>
            <p className="text-sm  mb-2">Prioridade: {task.priority}</p>
            <p className="text-sm  mb-2">Data de conclusão: {task.dueDate}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4 justify-center mt-10 items-center">
          <CircleAlert className="w-40 h-40" />
          <p>Não possui itens nesta coluna.</p>
        </div>
      )}
    </div>
  );
}
