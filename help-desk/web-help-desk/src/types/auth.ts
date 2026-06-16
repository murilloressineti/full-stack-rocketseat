import type { AppUser } from "@/types";

export interface AuthContextData {
  user: AppUser | null;
  token: string | null;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;

  isAuthenticated: boolean;
}
