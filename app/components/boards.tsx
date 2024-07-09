"use client";
import { Task } from "@/types/request";
import { CardTasks } from "./card-task";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Boards({ task }: { task: Task[] }) {
  const [tasks, setTasks] = useState(task);
  const { toast } = useToast();

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    status: "Não iniciado" | "Em andamento" | "Concluído"
  ) {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex > -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status };
      setTasks(updatedTasks);
    }
  }

  const notStarted = tasks.filter((task) => task.status === "Não iniciado");
  const inProgress = tasks.filter((task) => task.status === "Em andamento");
  const concluded = tasks.filter((task) => task.status === "Concluído");

  return (
    <>
      <div
        className="p-2 rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Não iniciado")}
      >
        <div className="rounded-2xl bg-blue-700  flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-blue-700 w-7 flex justify-center rounded-full font-semibold">
            {notStarted.length}
          </div>
          <h2 className="text-lg text-white">Não Iniciado</h2>
        </div>
        <CardTasks tasks={notStarted} />
      </div>
      <div
        className="p-2 rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Em andamento")}
      >
        <div className="rounded-2xl bg-yellow-500 flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-yellow-500 w-7 flex justify-center rounded-full font-semibold">
            {inProgress.length}
          </div>
          <h2 className="text-lg text-white truncate">Em Andamento</h2>
        </div>

        <CardTasks tasks={inProgress} />
      </div>
      <div
        className="p-2 rounded shadow-lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Concluído")}
      >
        <div className="rounded-2xl bg-green-600 flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-green-600 w-7 flex justify-center rounded-full font-semibold">
            {concluded.length}
          </div>
          <h2 className="text-lg text-white">Concluído</h2>
        </div>

        <CardTasks tasks={concluded} />
      </div>
    </>
  );
}
