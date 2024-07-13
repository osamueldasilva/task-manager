"use client";

import { ObjectTask } from "@/types/request";
import { CardTasks } from "./card-task";
import { useState } from "react";
import { put } from "@/lib/request";
import { toast } from "sonner";

export default function Boards({ data }: { data: ObjectTask[] }) {
  const [tasks, setTasks] = useState(() => data);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  if (tasks !== data) {
    setTasks(data);
  }

  async function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    status: "Não iniciado" | "Em andamento" | "Concluído"
  ) {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex > -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status };
      const taskUpdated = updatedTasks[taskIndex];
      setTasks(updatedTasks);
      const { data } = await put({
        body: taskUpdated,
        url: "/api/task",
        pathName: "/task",
      });

      if (data.status === 200) {
        toast.success(data.message);
      }
    }

    setDragOverColumn(null);
  }

  const notStarted = tasks.filter((task) => task.status === "Não iniciado");
  const inProgress = tasks.filter((task) => task.status === "Em andamento");
  const concluded = tasks.filter((task) => task.status === "Concluído");

  return (
    <>
      <div
        className={`p-2 rounded shadow-lg `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverColumn("Não iniciado");
        }}
        onDragLeave={() => setDragOverColumn(null)}
        onDrop={(e) => handleDrop(e, "Não iniciado")}
      >
        <div className="rounded-2xl bg-blue-700  flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-blue-700 w-7 flex justify-center rounded-full font-semibold">
            {notStarted.length}
          </div>
          <h2 className="text-lg text-white truncate">Não Iniciado</h2>
        </div>
        <CardTasks dragOverColumn={dragOverColumn} tasks={notStarted} />
      </div>
      <div
        className={`p-2 rounded shadow-lg `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverColumn("Em andamento");
        }}
        onDragLeave={() => setDragOverColumn(null)}
        onDrop={(e) => handleDrop(e, "Em andamento")}
      >
        <div className="rounded-2xl bg-yellow-500 flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-yellow-500 w-7 flex justify-center rounded-full font-semibold">
            {inProgress.length}
          </div>
          <h2 className="text-lg text-white truncate">Em Andamento</h2>
        </div>
        <CardTasks dragOverColumn={dragOverColumn} tasks={inProgress} />
      </div>
      <div
        className={`p-2 rounded shadow-lg `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverColumn("Concluído");
        }}
        onDragLeave={() => setDragOverColumn(null)}
        onDrop={(e) => handleDrop(e, "Concluído")}
      >
        <div className="rounded-2xl bg-green-600 flex gap-4 px-4 items-center py-1">
          <div className="bg-white text-green-600 w-7 flex justify-center rounded-full font-semibold">
            {concluded.length}
          </div>
          <h2 className="text-lg text-white">Concluído</h2>
        </div>
        <CardTasks dragOverColumn={dragOverColumn} tasks={concluded} />
      </div>
    </>
  );
}
