import React, { createContext, useContext, useState } from "react";

// Context'i Oluşturma
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState("http://192.168.118.138:5000");

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Context'i kullanma hook'u
export const useApi = () => useContext(ApiContext);
