import type { UserRole } from "@/types";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;
  availability?: string[];
}