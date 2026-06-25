import { api } from "./api";
import type { Client } from "@/types";

// Listar Clientes
export async function getClients(): Promise<Client[]> {
  const response = await api.get<Client[]>("/users");

  return response.data.filter((user) => user.role === "client");
}

// Editar Cliente
export async function updateClient(
  id: string,
  data: { name: string; email: string },
): Promise<Client> {
  const response = await api.put<Client>(`/users/${id}`, data);
  return response.data;
}

// Excluir Cliente
export async function deleteClient(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}