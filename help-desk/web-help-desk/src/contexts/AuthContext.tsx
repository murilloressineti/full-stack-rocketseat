import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { login } from "@/services/authService";
import type { AppUser, AuthContextData } from "@/types";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

// Com o contexto, podemos acessar o usuário e o token em qualquer componente da aplicação, sem precisar passar props manualmente. O contexto também fornece funções para fazer login e logout, além de um estado de carregamento para indicar quando a autenticação está sendo verificada.
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    const response = await login({ email, password });

    setUser(response.user);
    setToken(response.token);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    return response;
  }

  function signOut() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function updateUser(updatedUser: AppUser) {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        updateUser,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
