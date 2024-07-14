import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const messages = {
  email: "É necessário fornecer um endereço de email.",
  passwordRequired: "É necessário fornecer uma senha.",
};

export const schemaLoginForm = z.object({
  email: z
    .string({ required_error: messages.email })
    .min(1, { message: messages.email }),
  password: z
    .string({ required_error: messages.passwordRequired })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const resolver = zodResolver(schemaLoginForm);

export type LoginFormValues = z.infer<typeof schemaLoginForm>;
