import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

const ClientesContext = createContext();

export const useClientes = () => useContext(ClientesContext);

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_CLIENTES}/clientes`);
      setClientes(response.data);
    } catch (error) {
      alert("Error al obtener los clientes");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <ClientesContext.Provider value={{ clientes, loading, obtenerClientes }}>
      {children}
    </ClientesContext.Provider>
  );
};