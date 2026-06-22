import { api } from "./api";
import type { Technician } from "@/types";

interface CreateTechnicianData {
  name: string;
  email: string;
}

// Listar técnicos
export async function getTechnicians(): Promise<Technician[]> {
  const response = await api.get<Technician[]>("/users");

  return response.data.filter((user) => user.role === "technician");
}

// Criar técnico
export async function createTechnician(data: CreateTechnicianData) {
  const response = await api.post("/users", {
    ...data,
    role: "technician",
  });

  return response.data;
}
