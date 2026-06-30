import { api } from "./api";
import type { Service } from "@/types";

interface ServiceFormData {
  name: string;
  description?: string;
  price: number;
}

// Criar serviço
export async function createService(data: ServiceFormData): Promise<Service> {
  const response = await api.post<Service>("/services", data);
  return response.data;
}

// Listar serviços
export async function getServices(): Promise<Service[]> {
  const response = await api.get<Service[]>("/services", {
    params: {
      includeInactive: true,
    },
  });

  return response.data;
}

// Listar serviços ativos
export async function getActiveServices(): Promise<Service[]> {
  const response = await api.get<Service[]>("/services");

  return response.data;
}

// Editar serviço
export async function updateService(
  id: string,
  data: Partial<ServiceFormData>,
): Promise<Service> {
  const response = await api.put<Service>(`/services/${id}`, data);
  return response.data;
}

// Desativar serviço
export async function deactivateService(id: string): Promise<Service> {
  const response = await api.delete<Service>(`/services/${id}`);
  return response.data;
}

// Reativar serviço
export async function reactivateService(id: string): Promise<Service> {
  const response = await api.patch<Service>(`/services/${id}/reactivate`);
  return response.data;
}
