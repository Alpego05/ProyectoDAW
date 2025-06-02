import { createContext, useState, useEffect } from "react";

export const MedEnfsContext = createContext();

export const MedEnfsProvider = ({ children }) => {
  
  const [medicamentos, setMedicamentos] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);

  const getToken = () => {
    return localStorage.getItem("authToken") || "";
};

  const fetchEnfermedades = async () => {
    try {
      const response = await fetch(`http://localhost:3000/enf`, {
        method: "GET",
        headers: {
          'Authorization': `${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data.data);
      setEnfermedades(data.data);
    } catch (error) {
      console.error('Error fetching enfermedades:', error);
    }
  };

  const fetchMedicamentos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/med`, {
        method: "GET",
        headers: {
          'Authorization': `${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data.data);
      setMedicamentos(data.data);
    } catch (error) {
      console.error('Error fetching medicamentos:', error);
    }
  };

  useEffect(() => {
    fetchEnfermedades();
    fetchMedicamentos();
  }, []);

  return (
    <MedEnfsContext.Provider value={{medicamentos, enfermedades,}}>
      {children}
    </MedEnfsContext.Provider>
  );
};



export default MedEnfsContext;
