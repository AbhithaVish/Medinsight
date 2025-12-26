import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ✅ LAZY INITIALIZATION (BEST PRACTICE)
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role) {
        return { token, role };
      }
      return null;
    } catch (error) {
      console.error("Auth init error:", error);
      return null;
    }
  });

  // ✅ LOGIN
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
