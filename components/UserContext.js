import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Store JWT token

  console.log("Current token: ", token); // Log token to check if it is being set

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom hook to access UserContext easily
export const useUser = () => useContext(UserContext);
