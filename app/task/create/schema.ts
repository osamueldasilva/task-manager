import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const messages = {
  title: "O título da tarefa é obrigatório.",
  description: "A descrição da tarefa é obrigatório.",
  priority: "É obrigatório selecionar a prioridade",
  dataConclusion: "É obrigatório selecionar a data para conclusão",
};

export const schemaCreateTask = z.object({
  title: z
    .string({ required_error: messages.title })
    .min(1, { message: messages.title }),
  description: z
    .string({ required_error: messages.description })
    .min(1, { message: messages.description }),
  priority: z
    .string({ required_error: messages.priority })
    .min(1, { message: messages.priority }),
  dataConclusion: z.date({
    required_error: messages.dataConclusion,
  }),
});

export const resolver = zodResolver(schemaCreateTask);

export type CreateTasks = z.infer<typeof schemaCreateTask>;
