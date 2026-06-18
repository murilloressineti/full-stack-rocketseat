import { z } from "zod";

// O schema é o contrato de validação dos dados, ele define quais campos são obrigatórios, quais são opcionais, quais são os tipos de dados esperados, etc. Ele é usado para validar os dados antes de enviá-los para o backend, garantindo que eles estejam no formato correto e evitando erros de validação no servidor.
export const loginSchema = z.object({
  email: z.email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
