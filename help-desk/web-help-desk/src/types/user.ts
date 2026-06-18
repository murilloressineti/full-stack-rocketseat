export type UserRole = "admin" | "client" | "technician";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;

  availability?: string[];
  mustChangePassword?: boolean;
  
  createdAt?: string;
  updatedAt?: string;
}
