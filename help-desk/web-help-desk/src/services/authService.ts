import { api } from "./api";

import type { RegisterData, RegisterResponse, UserRole } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/sessions", data);

  return response.data;
}

export async function registerUser(
  data: RegisterData,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users/public", data);

  return response.data;
}
