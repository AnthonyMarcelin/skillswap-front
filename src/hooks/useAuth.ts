import { useState, useEffect, useCallback } from "react";
import * as authService from "@/services/auth.service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Optionnel : tu peux aussi stocker les infos user si tu veux
  // const [user, setUser] = useState(null);

  const checkAuthentication = useCallback(async () => {
    try {
      const data = await authService.checkAuth();
      setIsAuthenticated(data.authenticated);
      // setUser(data.user);
    } catch {
      setIsAuthenticated(false);
      // setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      // setUser(null);
    } catch (error) {
      console.error("Erreur logout :", error);
    }
  };

  return {
    isAuthenticated,
    logout,
    checkAuthentication, // au cas où tu veux rafraîchir manuellement
    // user,
  };
}