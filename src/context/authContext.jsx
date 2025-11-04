// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser, updateCurrentUserProfile } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const isAuthenticated = !!user;

  const register = async (payload) => {
    const u = await registerUser(payload);
    setUser(u);
    return u;
  };

  const login = async (payload) => {
    const u = await loginUser(payload);
    setUser(u);
    return u;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateProfile = ({ name, tel }) => {
    const updated = updateCurrentUserProfile({ name, tel });
    setUser(updated);
    return updated;
  };

  // Sincroniza si otro tab cierra sesión
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "lug_current_user") {
        setUser(getCurrentUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
