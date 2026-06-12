export type UserRole = "admin" | "client" | "technician";

export interface AppUser {
  name: string;
  email: string;
  avatar?: string;
}