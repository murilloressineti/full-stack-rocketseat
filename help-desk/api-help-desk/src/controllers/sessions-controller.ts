import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

import { AppError } from "@/utils/AppError";

class SessionsController {
  // Cria uma nova sessão (login)
  // Valida email e senha do usuário e retorna um JWT junto com os dados do usuário
  async create(request: Request, response: Response) {
    // Define o formato esperado do corpo da requisição e valida com Zod
    const bodySchema = z.object({
      email: z.string().email(), // email deve ser válido
      password: z.string().min(6), // senha deve ter ao menos 6 caracteres
    });

    // Faz parse e validação do corpo da requisição
    const { email, password } = bodySchema.parse(request.body);

    // Busca o usuário no banco pelo email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    // Se usuário não existir, lança erro de autenticação
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Compara a senha fornecida com a senha armazenada (hash)
    const passwordMatched = await compare(password, user.password);

    // Se senha não bater, lança erro de autenticação
    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    // Extrai informações do JWT do arquivo de configuração
    const { secret, expiresIn } = authConfig.jwt;

    // Gera o token JWT contendo a role do usuário, assinando com o secret e definindo validade
    const token = sign({ role: user.role ?? "client" }, secret, {
      subject: user.id, // ID do usuário como subject
      expiresIn, // tempo de expiração do token
    });

    // Remove a senha do usuário para não retornar na resposta
    const { password: hashedPassowrd, ...userWithoutPassword } = user;

    // Retorna o token JWT e os dados do usuário sem senha
    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
