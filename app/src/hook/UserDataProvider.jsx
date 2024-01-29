// UserContext.js

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData) => {
    // Lógica de inicio de sesión
    setUser(userData);
    setIsAdmin(userData.role === "admin");
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
