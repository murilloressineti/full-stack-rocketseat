import type { UserRole } from "@/types";

export interface UserMenuProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: UserRole;
  availability?: string[];
}