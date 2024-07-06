"use client";

import { Task } from "@/types/request";
import { NavigateEdit } from "./button-navigate";
import { useState } from "react";
import { CircleAlert } from "lucide-react";

export function CardTasks({ tasks }: { tasks: Task[] }) {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, taskId: string) {
    e.dataTransfer.setData("taskId", taskId);
    setDraggingTaskId(taskId);
  }

  function handleDragEnd() {
    setDraggingTaskId(null);
  }

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 cursor-pointer bg-background rounded shadow mb-4 transition-transform duration-500 hover:scale-105 hover:translate-y-[-2px] hover:bg-background/80 ${
              draggingTaskId === task.id ? "opacity-50" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mb-2">{task.title}</h3>
              <NavigateEdit id={task.id} />
            </div>
            <p className=" mb-2">{task.description}</p>
            <p className="text-sm  mb-2">Prioridade: {task.priority}</p>
            <p className="text-sm  mb-2">Data de conclusão: {task.dueDate}</p>
            <b
              className={`text-sm ${
                task.status === "Não iniciado"
                  ? "text-gray-500"
                  : task.status === "Em andamento"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Status: {task.status}
            </b>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4 justify-center mt-10 items-center">
          <CircleAlert className="w-40 h-40" />
          <p>Não possui itens nesta coluna.</p>
        </div>
      )}
    </>
  );
}
