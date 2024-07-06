import { Task } from "@/types/request";

export function CardTasks({ tasks }: { tasks: Task[] }) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-bold mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            Prioridade: {task.priority}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Data de conclusão: {task.dueDate}
          </p>
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
      ))}
    </>
  );
}
