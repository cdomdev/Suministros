import { createContext, useState, useContext } from 'react';

export const UserRoleContext = createContext();

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState('');

  const setUserRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
