import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log("user", user);

  const login = async (userData) => {
    setUser(userData);

    if (userData?.groups?.includes("administrador")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
  };

  const loadUser = async () => {
    // Implementar lógica para cargar el usuario si es necesario
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};