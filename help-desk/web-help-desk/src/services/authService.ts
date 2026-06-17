import { api } from "./api";
import type { UserRole } from "@/types";
import type { RegisterData, RegisterResponse } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("/sessions", data);

  return response.data;
}

export async function registerUser(
  data: RegisterData,
): Promise<RegisterResponse> {
  const response = await api.post("/users/public", data);

  return response.data;
}
