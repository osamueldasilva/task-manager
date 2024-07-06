"use client";
import { Task } from "@/types/request";
import { CardTasks } from "./card-task";
import { useState } from "react";

export default function Boards({ task }: { task: Task[] }) {
  const [tasks, setTasks] = useState(task);
  console.log("🚀 ~ Boards ~ tasks:", tasks);

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
        className="bg-gray-300 dark:bg-gray-700 p-4 rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Não iniciado")}
      >
        <h2 className="text-xl font-bold mb-4">
          Não Iniciado - {notStarted.length}
        </h2>
        <CardTasks tasks={notStarted} />
      </div>
      <div
        className="bg-gray-300 dark:bg-gray-700 p-4 rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Em andamento")}
      >
        <h2 className="text-xl font-bold mb-4">
          Em Andamento - {inProgress.length}
        </h2>
        <CardTasks tasks={inProgress} />
      </div>
      <div
        className="bg-gray-300 dark:bg-gray-700 p-4 rounded shadow"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "Concluído")}
      >
        <h2 className="text-xl font-bold mb-4">
          Concluído - {concluded.length}
        </h2>
        <CardTasks tasks={concluded} />
      </div>
    </>
  );
}
