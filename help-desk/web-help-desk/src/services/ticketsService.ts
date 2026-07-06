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
  code: string;
  title: string;
  description?: string | null;
  serviceName: string;
  totalPrice: string | number;
  clientName: string;
  clientAvatar?: string | null;
  technicianName: string;
  technicianEmail?: string;
  technicianAvatar?: string | null;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  services?: Ticket["services"];
};

interface AddTicketServiceData {
  serviceId: string;
  quantity: number;
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

// Lista chamados para exibição no dashboard do técnico
export async function getTechnicianTicketCards(): Promise<
  TechnicianTicketCardData[]
> {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data.map((ticket) => ({
    id: ticket.id,
    code: ticket.id,
    title: ticket.title ?? "Sem título",
    description: ticket.description,
    serviceName:
      ticket.services?.map((item) => item.service.name).join(", ") ||
      "Sem serviço",
    totalPrice: ticket.totalPrice,
    clientName: ticket.client?.name ?? "Cliente não informado",
    clientAvatar: ticket.client?.avatar ?? null,
    technicianName: ticket.technician?.name ?? "Técnico não informado",
    technicianEmail: ticket.technician?.email,
    technicianAvatar: ticket.technician?.avatar ?? null,
    status: ticket.status,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    services: ticket.services,
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

// Adicionar serviço adicional a um chamado
export async function addTicketService(
  ticketId: string,
  data: AddTicketServiceData,
): Promise<Ticket> {
  const response = await api.post<Ticket>(
    `/tickets/${ticketId}/services`,
    data,
  );

  return response.data;
}

// Remover serviço adicional de um chamado
export async function deleteTicketService(
  ticketId: string,
  ticketServiceId: string,
) {
  const response = await api.delete(
    `/tickets/${ticketId}/services/${ticketServiceId}`,
  );

  return response.data;
}

export async function getTicketById(id: string): Promise<Ticket> {
  const response = await api.get<Ticket>(`/tickets/${id}`);

  return response.data;
}
