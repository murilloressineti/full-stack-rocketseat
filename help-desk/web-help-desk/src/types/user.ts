export type UserRole = "admin" | "client" | "technician";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;

  createdAt?: string;
  updatedAt?: string;
}
