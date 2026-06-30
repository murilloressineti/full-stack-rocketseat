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
