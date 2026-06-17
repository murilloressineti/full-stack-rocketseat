import type { AppUser } from "@/types";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends AppUser {
  id: string;
}