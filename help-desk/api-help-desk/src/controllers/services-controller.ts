import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class ServicesController {
  // Cria um novo serviço (apenas administradores podem criar)
  async create(request: Request, response: Response) {
    // Pega o usuário logado que está no request
    const loggedUser = request.user;

    // Valida se usuário existe e é admin
    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can create services", 403);
    }

    // Valida o corpo da requisição usando Zod
    const bodySchema = z.object({
      name: z.string().trim().min(2), // nome obrigatório e com pelo menos 2 caracteres
      description: z.string().optional(), // descrição opcional
      price: z.number().positive(), // preço positivo obrigatório
    });

    // Faz o parse e validação do corpo
    const { name, description, price } = bodySchema.parse(request.body);

    // Cria o serviço no banco de dados com status ativo por padrão
    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        active: true,
      },
    });

    // Retorna o serviço criado com status HTTP 201
    return response.status(201).json(service);
  }

  // Lista serviços ativos ou todos dependendo do query param
  async index(request: Request, response: Response) {
    // Verifica se deve incluir serviços inativos
    const includeInactive = request.query.includeInactive === "true";

    // Busca serviços no banco, filtra ativos se necessário e ordena pelo nome
    const services = await prisma.service.findMany({
      where: includeInactive ? {} : { active: true },
      orderBy: { name: "asc" },
    });

    // Retorna a lista de serviços
    return response.status(200).json(services);
  }

  // Atualiza um serviço (apenas admin)
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    // Valida se usuário é admin
    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can update services", 403);
    }

    // Valida corpo da requisição com campos opcionais
    const bodySchema = z.object({
      name: z.string().trim().min(2).optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
    });

    const { name, description, price } = bodySchema.parse(request.body);

    // Verifica se o serviço existe
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    // Atualiza o serviço no banco
    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, price },
    });

    // Retorna o serviço atualizado
    return response.status(200).json(updatedService);
  }

  // Desativa um serviço (soft delete, apenas admin)
  async deactivate(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    // Valida se usuário é admin
    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can deactivate services", 403);
    }

    // Verifica se o serviço existe
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    // Atualiza o serviço para ficar inativo
    const deactivatedService = await prisma.service.update({
      where: { id },
      data: { active: false },
    });

    // Retorna o serviço desativado
    return response.status(200).json(deactivatedService);
  }

  // Reativa um serviço (apenas admin)
  async reactivate(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    // Valida se usuário é admin
    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can reactivate services", 403);
    }

    // Verifica se o serviço existe
    const service = await prisma.service.findUnique({ where: { id } });

    // Se não existir, lança um erro
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    // Atualiza o serviço para ficar ativo
    const reactivatedService = await prisma.service.update({
      where: { id },
      data: { active: true },
    });

    // Retorna o serviço reativado
    return response.status(200).json(reactivatedService);
  }
}

export { ServicesController };
