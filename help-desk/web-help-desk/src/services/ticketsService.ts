import { api } from "./api";
import type { Ticket, TicketStatus } from "@/types";

// Listar tickets
export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data;
}

// Editar ticket
export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<Ticket> {
  const response = await api.put<Ticket>(`/tickets/${id}`, {
    status,
  });

  return response.data;
}