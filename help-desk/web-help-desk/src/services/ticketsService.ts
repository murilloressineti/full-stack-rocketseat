import { api } from "./api";
import type { Ticket } from "@/types";

// Listar tickets
export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data;
}
