import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/auth/me")
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));

  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}