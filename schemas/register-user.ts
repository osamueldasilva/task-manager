import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const messages = {
  name: "É necessário fornecer o nome completo.",
  email: "É necessário fornecer um endereço de email.",
  passwordRequired: "É necessário fornecer uma senha.",
  confirmPassword: "É necessário confirmar a senha.",
  passwordStrength:
    "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número e um caractere especial.",
};

const passwordSchema = z
  .string({ required_error: messages.passwordRequired })
  .min(6, { message: messages.passwordStrength })
  .regex(/[A-Z]/, { message: messages.passwordStrength })
  .regex(/[0-9]/, { message: messages.passwordStrength })
  .regex(/[@$!%*?&#.,]/, { message: messages.passwordStrength });

export const schemaRegisterForm = z
  .object({
    email: z
      .string({ required_error: messages.email })
      .min(1, { message: messages.email })
      .email("Endereço de email inválido."),
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: messages.confirmPassword })
      .min(1, { message: messages.confirmPassword }),
    name: z
      .string({ required_error: messages.name })
      .min(1, { message: messages.name }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

export const resolver = zodResolver(schemaRegisterForm);

export type RegisterFormValues = z.infer<typeof schemaRegisterForm>;
