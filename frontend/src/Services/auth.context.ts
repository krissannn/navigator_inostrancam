import { createContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);