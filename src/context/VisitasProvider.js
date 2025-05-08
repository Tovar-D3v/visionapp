import React, { createContext, useContext, useState, useEffect } from "react";
import config from "../config/config";
import axios from "axios";

const VisitasContext = createContext();

export const useVisitas = () => useContext(VisitasContext);

export const VisitasProvider = ({ children }) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerVisitas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_VISITAS}/visitas`);
      setVisitas(response.data);
    } catch (error) {
      alert("Error al obtener las visitas");
    } finally {
      setLoading(false);
    }
  };

  const crearVisita = async (nuevaVisita) => {
    try {
      const response = await axios.post(`${config.API_VISITAS}/visitas`, nuevaVisita);
      obtenerVisitas();
      return response.data;
    } catch (error) {
      alert("Error al crear la visita, verifica los datos");
      throw error;
    }
  };

  useEffect(() => {
    obtenerVisitas();
  }, []);

  return (
    <VisitasContext.Provider value={{ visitas, loading, obtenerVisitas, crearVisita }}>
      {children}
    </VisitasContext.Provider>
  );
};