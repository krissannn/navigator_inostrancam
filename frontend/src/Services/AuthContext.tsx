import { useState, type ReactNode } from "react";
import { authService } from "./auth.service";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authService.isAuthenticated()
  );

  const login = (token: string, username: string) => {
    authService.setToken(token);
    authService.setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.clearToken();
    authService.clearCurrentUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}