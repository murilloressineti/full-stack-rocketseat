import { api } from "./api";
import type { Ticket, TicketStatus } from "@/types";

interface CreateTicketData {
  title: string;
  description?: string;
  services: {
    serviceId: string;
    quantity: number;
  }[];
}

export type TechnicianTicketCardData = {
  id: string;
  title: string;
  serviceName: string;
  updatedAt: string;
  totalPrice: string | number;
  clientName: string;
  clientAvatar?: string | null;
  status: TicketStatus;
};

// Criar chamado
export async function createTicket(data: CreateTicketData): Promise<Ticket> {
  const response = await api.post<Ticket>("/tickets", data);
  return response.data;
}

// Lista chamados de acordo com a role do usuário
export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data;
}

// Lista chamados para exibição no dashboard do técnico
export async function getTechnicianTicketCards(): Promise<
  TechnicianTicketCardData[]
> {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data.map((ticket) => ({
    id: ticket.id,
    title: ticket.title ?? "Sem título",
    serviceName:
      ticket.services?.map((item) => item.service.name).join(", ") ||
      "Sem serviço",
    updatedAt: ticket.updatedAt,
    totalPrice: ticket.totalPrice,
    clientName: ticket.client?.name ?? "Cliente não informado",
    clientAvatar: ticket.client?.avatar ?? null,
    status: ticket.status,
  }));
}

// Editar chamado
export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<Ticket> {
  const response = await api.put<Ticket>(`/tickets/${id}`, {
    status,
  });

  return response.data;
}
