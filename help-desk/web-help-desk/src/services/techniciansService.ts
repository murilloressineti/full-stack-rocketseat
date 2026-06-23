import { api } from "./api";
import type { Technician } from "@/types";

interface CreateTechnicianData {
  name: string;
  email: string;
}

interface UpdateTechnicianData {
  name: string;
  email: string;
  availability: string[];
  avatar?: string | null;
}

// Criar técnico
export async function createTechnician(data: CreateTechnicianData) {
  const response = await api.post("/users", {
    ...data,
    role: "technician",
  });

  return response.data;
}

// Listar técnicos
export async function getTechnicians(): Promise<Technician[]> {
  const response = await api.get<Technician[]>("/users");

  return response.data.filter((user) => user.role === "technician");
}

// Editar técnico
export async function updateTechnician(
  id: string,
  data: UpdateTechnicianData,
): Promise<Technician> {
  const response = await api.put<Technician>(`/users/${id}`, data);
  return response.data;
}

// Excluir técnico
export async function deleteTechnician(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
