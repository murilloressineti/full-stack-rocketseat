import type { Service } from "./service";

export type TicketStatus = "open" | "in_progress" | "closed";

export interface TicketUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface TicketServiceItem {
  id: string;
  ticketId: string;
  serviceId: string;

  quantity: number;

  priceAtTime: string | number;

  service: Service;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string | null;
  status: TicketStatus;
  totalPrice: string | number;
  createdAt: string;
  updatedAt: string;

  client: TicketUser;
  technician: TicketUser;
  services: TicketServiceItem[];
}
