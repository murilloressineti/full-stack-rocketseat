import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";

export class TicketsController {
  // Criar novo chamado (somente CLIENT pode criar)
  async create(request: Request, response: Response) {
    // Recupera o usuário autenticado do middleware
    const loggedUser = request.user;

    // Se não estiver autenticado, lança erro 401
    if (!loggedUser) {
      throw new AppError("Authentication required", 401);
    }

    // Regra de negócio: somente clientes podem criar chamados
    if (loggedUser.role !== "client") {
      throw new AppError("Only clients can create tickets", 403);
    }

    // Define o esquema de validação do corpo da requisição
    // com Zod para garantir integridade dos dados recebidos
    const bodySchema = z.object({
      title: z.string().min(2),
      description: z.string().optional(),
      services: z
        .array(
          z.object({
            serviceId: z.string().uuid(),
            quantity: z.number().min(1).default(1),
          }),
        )
        .min(1, "O Chamado deve ter pelo menos um serviço selecionado."),
    });

    // Faz o parse (e validação) dos dados de entrada
    const { title, description, services } = bodySchema.parse(request.body);

    // Transação — garante consistência:
    // se algo der errado em qualquer etapa, nada é persistido
    const ticket = await prisma.$transaction(async (tx) => {
      // 1️⃣ Busca o técnico com menos chamados abertos ou em andamento
      const technicians = await tx.user.findMany({
        where: {
          role: "technician",
        },
        include: {
          ticketsAssigned: {
            where: {
              status: {
                in: ["open", "in_progress"],
              },
            },
          },
        },
      });

      // Se não houver técnicos disponíveis, lança erro 404
      if (technicians.length === 0) {
        throw new AppError("No technician available", 404);
      }

      // Ordena os técnicos pelo número de chamados atribuídos e seleciona o primeiro (menos ocupado)
      const technician = [...technicians].sort(
        (a, b) => a.ticketsAssigned.length - b.ticketsAssigned.length,
      )[0];

      // 2️⃣ Calcula o preço total e armazena os dados de cada serviço
      let totalPrice = new Decimal(0);
      const serviceData = [];

      for (const item of services) {
        // Busca o serviço no banco e garante que está ativo (soft delete)
        const service = await tx.service.findFirst({
          where: { id: item.serviceId, active: true },
        });

        if (!service) {
          throw new AppError(
            `Service not found or inactive: ${item.serviceId}`,
            400,
          );
        }

        // Usa Decimal para cálculos precisos de valores monetários
        const itemTotal = service.price.mul(item.quantity);
        totalPrice = totalPrice.add(itemTotal);

        // Monta os dados de relacionamento TicketService
        serviceData.push({
          serviceId: service.id,
          priceAtTime: service.price,
          quantity: item.quantity,
          addedById: loggedUser.id, // O cliente adiciona os serviços iniciais
        });
      }

      // 3️⃣ Cria o ticket e associa os serviços em operação aninhada
      const newTicket = await tx.ticket.create({
        data: {
          title,
          description,
          technicianId: technician.id,
          clientId: loggedUser.id,
          totalPrice,
          services: {
            create: serviceData, // Cria as relações ticket_services
          },
        },
        include: {
          services: { include: { service: true } },
          technician: true,
          client: true,
        },
      });

      return newTicket;
    });

    return response.status(201).json(ticket);
  }

  // Listar chamados (Admin, Técnico ou Cliente)
  async index(request: Request, response: Response) {
    const loggedUser = request.user;

    if (!loggedUser) {
      throw new AppError("Authentication required", 401);
    }

    let tickets;

    // ADMIN → vê todos os chamados
    if (loggedUser.role === "admin") {
      tickets = await prisma.ticket.findMany({
        include: {
          technician: true,
          client: true,
          services: { include: { service: true } },
        },
      });
    }
    // TECHNICIAN → vê somente chamados atribuídos a ele
    else if (loggedUser.role === "technician") {
      tickets = await prisma.ticket.findMany({
        where: { technicianId: loggedUser.id },
        include: {
          technician: true,
          client: true,
          services: { include: { service: true } },
        },
      });
    }
    // CLIENT → vê apenas seus próprios chamados
    else {
      tickets = await prisma.ticket.findMany({
        where: { clientId: loggedUser.id },
        include: {
          technician: true,
          services: { include: { service: true } },
        },
      });
    }

    return response.json(tickets);
  }

  // Atualizar status ou informações do ticket
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    if (!loggedUser) {
      throw new AppError("Authentication required", 401);
    }

    // Validação dos dados atualizáveis
    const bodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      technicianId: z.string().uuid().optional(),
      status: z.enum(["open", "in_progress", "closed"]).optional(),
    });

    const data = bodySchema.parse(request.body);

    // Verifica se o chamado existe
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    // Regras de permissão
    const isAdmin = loggedUser.role === "admin";
    const isTechnician =
      loggedUser.role === "technician" && loggedUser.id === ticket.technicianId;

    if (!isAdmin && !isTechnician) {
      throw new AppError("You are not allowed to update this ticket", 403);
    }

    // Atualiza o ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data,
      include: {
        technician: true,
        client: true,
        services: { include: { service: true } },
      },
    });

    return response.json(updatedTicket);
  }

  // Técnico adiciona novos serviços a um chamado
  async addService(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    if (!loggedUser) {
      throw new AppError("Authentication required", 401);
    }

    if (loggedUser.role !== "technician") {
      throw new AppError("Only technicians can add services", 403);
    }

    // Validação da entrada
    const bodySchema = z.object({
      serviceId: z.string().uuid(),
      quantity: z.number().min(1).default(1),
    });

    const { serviceId, quantity } = bodySchema.parse(request.body);

    // Busca o chamado
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { services: true },
    });

    if (!ticket) throw new AppError("Ticket not found", 404);

    // Garante que o técnico só edite seus próprios chamados
    if (ticket.technicianId !== loggedUser.id) {
      throw new AppError("You are not assigned to this ticket", 403);
    }

    // Busca o serviço e garante que está ativo
    const service = await prisma.service.findFirst({
      where: { id: serviceId, active: true },
    });

    if (!service) throw new AppError("Service not found or inactive", 404);

    // Cria o registro TicketService
    const addedService = await prisma.ticketService.create({
      data: {
        ticketId: id,
        serviceId,
        priceAtTime: service.price,
        quantity,
        addedById: loggedUser.id,
      },
    });

    // Atualiza o total do ticket somando o novo serviço
    const newTotal = new Decimal(ticket.totalPrice).add(
      new Decimal(service.price).mul(quantity),
    );

    await prisma.ticket.update({
      where: { id },
      data: { totalPrice: newTotal },
    });

    return response.status(201).json(addedService);
  }

  // Excluir chamado (Admin ou dono do ticket)
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const loggedUser = request.user;

    if (!loggedUser) {
      throw new AppError("Authentication required", 401);
    }

    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket) throw new AppError("Ticket not found", 404);

    // Apenas Admin ou Cliente dono pode excluir
    const isAdmin = loggedUser.role === "admin";
    const isOwner =
      loggedUser.role === "client" && loggedUser.id === ticket.clientId;

    if (!isAdmin && !isOwner) {
      throw new AppError("You are not allowed to delete this ticket", 403);
    }

    await prisma.ticket.delete({ where: { id } });

    return response.status(204).send(); // 204 = sucesso sem corpo
  }
}
