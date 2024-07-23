import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const messages = {
  status: "É necessário selecionar o status.",
};

export const schemaAlterStatus = z.object({
  status: z
    .string({ required_error: messages.status })
    .min(1, { message: messages.status }),
});

export const resolver = zodResolver(schemaAlterStatus);

export type AlterStatus = z.infer<typeof schemaAlterStatus>;
