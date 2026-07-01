import { api } from "./api";
import type { AppUser } from "@/types";

interface UpdateProfileData {
  name: string;
  email: string;
  avatar?: string | null;
}

// Editar perfil do usuário
export async function updateProfile(
  id: string,
  data: UpdateProfileData,
): Promise<AppUser> {
  const response = await api.put<AppUser>(`/users/${id}`, data);

  return response.data;
}
