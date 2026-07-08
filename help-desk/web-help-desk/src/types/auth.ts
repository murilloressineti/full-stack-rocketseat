import type { LoginResponse } from "@/services/authService";

import type { AppUser } from "./user";

export interface AuthContextData {
  user: AppUser | null;
  token: string | null;

  loading: boolean;
  isAuthenticated: boolean;

  signIn: (email: string, password: string) => Promise<LoginResponse>;

  signOut: () => void;

  updateUser: (user: AppUser) => void;
}
