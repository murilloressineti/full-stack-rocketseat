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
  priceAtTime: string | number;
  quantity: number;
  service: {
    id: string;
    name: string;
    description?: string | null;
    price: string | number;
    active: boolean;
  };
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
