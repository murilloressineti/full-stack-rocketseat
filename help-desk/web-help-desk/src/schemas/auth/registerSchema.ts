import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
