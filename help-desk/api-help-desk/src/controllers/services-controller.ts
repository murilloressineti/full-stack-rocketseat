import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class ServicesController {
  // Criar um novo serviço (apenas admin)
  async create(request: Request, response: Response) {
    const loggedUser = request.user;

    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can create services", 403);
    }

    const bodySchema = z.object({
      name: z.string().trim().min(2),
      description: z.string().optional(),
      price: z.number().positive(),
    });

    const { name, description, price } = bodySchema.parse(request.body);

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        active: true, // serviço ativo por padrão
      },
    });

    return response.status(201).json(service);
  }

  // Listar serviços (ativos e/ou todos)
  async index(request: Request, response: Response) {
    const includeInactive = request.query.includeInactive === "true";

    const services = await prisma.service.findMany({
      where: includeInactive ? {} : { active: true },
      orderBy: { name: "asc" },
    });

    return response.status(200).json(services);
  }

  // Editar serviço (apenas admin)
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can update services", 403);
    }

    const bodySchema = z.object({
      name: z.string().trim().min(2).optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
    });

    const { name, description, price } = bodySchema.parse(request.body);

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, price },
    });

    return response.status(200).json(updatedService);
  }

  // Desativar serviço (soft delete, apenas admin)
  async deactivate(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    if (!loggedUser || loggedUser.role !== "admin") {
      throw new AppError("Only admins can deactivate services", 403);
    }

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    const deactivatedService = await prisma.service.update({
      where: { id },
      data: { active: false },
    });

    return response.status(200).json(deactivatedService);
  }
}

export { ServicesController };
