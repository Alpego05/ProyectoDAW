import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  

  return (
    <>
    </>
    
  );
};

export const useUser = () => useContext(UserContext);
