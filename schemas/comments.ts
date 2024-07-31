import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const messages = {
  comments: "Por favor, escreva um comentário para adicionar.",
  commentsLength: "O comentário não pode ter mais de 200 caracteres.",
};

export const schemaComments = z.object({
  comments: z
    .string({ required_error: messages.comments })
    .min(1, { message: messages.comments })
    .trim()
    .max(200, { message: messages.commentsLength }),
});

export const resolver = zodResolver(schemaComments);

export type SchemaComments = z.infer<typeof schemaComments>;
