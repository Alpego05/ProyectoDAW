import { createContext, useContext, useState } from "react";

export const MedEnfsContext = createContext();

export const MedEnfsProvider = ({ children }) => {
  
  const [medicamentos, setMedicamentos] = useState([]);
  const [enfermedades, setEnfermedades] = useState({});

  const fecthEnfermedades = async () => {
    const response = await fetch(`${API_BASE_URL}/enf`, {
      method: "GET",
      headers: {
        'Authorization': `${getToken()}`
      }
    });
    const data = await response.json();
    console.log(data.data);
    setEnfermedades(data.data);
  };

  const fetchMedicamentos = async () => {
    const response = await fetch(`${API_BASE_URL}/med`, {
      method: "GET",
      headers: {
        'Authorization': `${getToken()}`
      }
    });
    const data = await response.json();
    console.log(data.data);
    setMedicamentos(data.data);
    
  };

  useEffect(() => {
        fecthEnfermedades();
        fetchMedicamentos();
    },[])


  return (
    <>
    <MedEnfsContext.Provider value={{medicamentos, enfermedades }}>
      {children}
    </MedEnfsContext.Provider>
    
    </>
    
  );
};

export default MedEnfsContext;
