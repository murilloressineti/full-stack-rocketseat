import type { AppUser } from "./user";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends AppUser {
  id: string;
}
