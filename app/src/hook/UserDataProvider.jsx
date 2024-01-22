import { createContext, useState, useContext } from "react";

export const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "",
    email: "",
    picture: "",
    name: "",
  });

  const setUserData = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <UserDataContext.Provider
      value={{user, setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};
