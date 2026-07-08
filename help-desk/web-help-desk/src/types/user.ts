export type UserRole = "admin" | "client" | "technician";

export interface AppUser {
  id: string;

  name: string;
  email: string;
  avatar?: string | null;
  
  role: UserRole;

  mustChangePassword?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface Technician extends AppUser {
  role: "technician";
  availability: string[];
}
