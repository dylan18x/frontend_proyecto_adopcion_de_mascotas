import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {jwtDecode} from "jwt-decode"; 
import { loginApi, registerApi } from "../services/auth.service";

export type AuthUser = {
  id: number;
  username: string;
  email?: string;
  role: "ADMIN" | "USER";
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (payload: { username: string; password: string }) => Promise<void>;
  register: (payload: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("auth_token"));

  const login = async (payload: { username: string; password: string }) => {
    const token = await loginApi(payload);
    const decoded: any = jwtDecode(token);

    const userData: AuthUser = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role.toUpperCase(), 
    };

    setToken(token);
    setUser(userData);

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const register = async (payload: { username: string; email: string; password: string }) => {
    const token = await registerApi(payload);
    const decoded: any = jwtDecode(token);

    const userData: AuthUser = {
      id: decoded.sub,
      username: decoded.username,
      email: payload.email,
      role: decoded.role.toUpperCase(),
    };

    setToken(token);
    setUser(userData);

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}