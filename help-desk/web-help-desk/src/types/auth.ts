import type { AppUser } from "@/types";
import type { LoginResponse } from "@/services/authService";

export interface AuthContextData {
  user: AppUser | null;
  token: string | null;

  signIn: (email: string, password: string) => Promise<LoginResponse>;
  signOut: () => void;

  isAuthenticated: boolean;
  loading: boolean;
}
