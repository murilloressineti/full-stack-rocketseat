import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(request: Request, response: Response) {
    // Define o formato esperado do corpo da requisição e valida com Zod
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6).optional(),
      role: z.enum(["admin", "technician", "client"]).default("client"),
    });

    // Faz o parse e validação do corpo (lança erro automático se for inválido)
    const { name, email, password, role } = bodySchema.parse(request.body);

    // Verifica se já existe um usuário com o mesmo e-mail
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("User with same email already exists");
    }

    // Define variáveis que podem mudar conforme o tipo de usuário
    let finalPassword = password;
    let availability: string[] | undefined = undefined;
    let mustChangePassword = false;

    // Caso o papel seja "technician", aplicamos regras especiais
    if (role === "technician") {
      const loggedUser = request.user;

      // Apenas administradores podem criar técnicos
      if (!loggedUser || loggedUser.role !== "admin") {
        throw new AppError("Only admins can create technicians", 403);
      }

      // senha provisória gerada automaticamente
      finalPassword = "123456";
      availability = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ];

      mustChangePassword = true;
    }

    // Se ainda não tiver senha definida, lança erro
    if (!finalPassword) {
      throw new AppError("Password is required");
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await hash(finalPassword, 8);

    // Cria o usuário no banco de dados com os dados validados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        availability,
        mustChangePassword,
      },
    });

    // Remove a senha do retorno da resposta (por segurança)
    const { password: _, ...userWithoutPassword } = user;

    // Retorna o usuário criado com status HTTP 201 (Created)
    return response.status(201).json(userWithoutPassword);
  }

  async index(request: Request, response: Response) {
    // 1. Verifica se o usuário logado é admin
    const loggedUser = request.user;

    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can list users", 403);
    }

    // 2. Busca todos os usuários no banco
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
    });

    // 3. Remove o campo de senha antes de retornar
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);

    // 4. Retorna o resultado
    return response.json(usersWithoutPassword);
  }

  async update(request: Request, response: Response) {
    // Pegamos o ID do usuário a ser atualizado via params e o usuário logado (autenticado)
    const { id } = request.params;
    const loggedUser = request.user;

    // Definimos e validamos o corpo da requisição com zod
    const bodySchema = z.object({
      name: z.string().trim().min(2).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      role: z.enum(["admin", "technician", "client"]).optional(),
      availability: z.array(z.string()).optional(),
      avatar: z.string().url().optional(),
    });

    const { name, email, password, role, availability, avatar } =
      bodySchema.parse(request.body);

    // Buscamos o usuário no banco
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Regras de permissão
    const isAdmin = loggedUser?.role === "admin";
    const isOwner = loggedUser?.id === id;

    // - Apenas admin pode alterar role e disponibilidade
    if ((role || availability) && !isAdmin) {
      throw new AppError("Only admins can change role or availability", 403);
    }

    // - Usuários comuns só podem alterar os próprios dados
    if (!isAdmin && !isOwner) {
      throw new AppError("You can only update your own account", 403);
    }

    // Evitar e-mails duplicados
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: { email, NOT: { id } },
      });
      if (existingUser) {
        throw new AppError("Email already in use", 400);
      }
    }

    let hashedPassword: string | undefined = undefined;
    let mustChangePassword = user.mustChangePassword;

    if (password) {
      hashedPassword = await hash(password, 8);

      // Se for técnico com senha provisória, ao alterar a senha definimos mustChangePassword = false
      if (user.role === "technician" && user.mustChangePassword) {
        mustChangePassword = false;
      }
    }

    // Atualizamos o usuário no banco
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        availability,
        avatar,
        mustChangePassword,
      },
    });

    // Removemos o campo senha da resposta
    const { password: _, ...userWithoutPassword } = updatedUser;

    return response.status(200).json(userWithoutPassword);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    // Buscar o usuário a ser deletado
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError("User not found", 404);

    // Apenas admin pode deletar qualquer usuário
    if (loggedUser?.role !== "admin") {
      throw new AppError("Only admins can delete users", 403);
    }

    // Deletar o usuário
    await prisma.user.delete({ where: { id } });

    return response.status(204).send(); // 204 = No Content
  }
}

export { UsersController };
