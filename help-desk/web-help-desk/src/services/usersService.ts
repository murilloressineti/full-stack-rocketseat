import { api } from "./api";

import type { AppUser } from "@/types";

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
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

// Atualizar avatar do usuário
export async function updateAvatar(
  id: string,
  file: File,
): Promise<AppUser> {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.patch<AppUser>(`/users/${id}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}