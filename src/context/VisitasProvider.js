import React, { createContext, useContext, useState, useEffect } from "react";
import config from "../config/config";
import axios from "axios";

const VisitasContext = createContext();

export const useVisitas = () => useContext(VisitasContext);

export const VisitasProvider = ({ children }) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerVisitas = async () => {
    const url = `${config.API_VISITAS}/visitas`;
    setLoading(true);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(
        response.status,
        response.data
      );
      setVisitas(response.data);
    } catch (error) {
      const detalle = error.response
        ? error.response.data
        : error.message;
      console.error(
        detalle
      );
      alert("Error al obtener las visitas: " + JSON.stringify(detalle));
    } finally {
      setLoading(false);
    }
  };

  const crearVisita = async (nuevaVisita) => {
    const url = `${config.API_VISITAS}/visitas`;

    try {
      const response = await axios.post(url, nuevaVisita, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(
        response.status,
        response.data
      );
      await obtenerVisitas();
      return response.data;
    } catch (error) {
      const detalle = error.response
        ? error.response.data
        : error.message;
      console.error(
        detalle
      );
      alert("Error al crear la visita: " + JSON.stringify(detalle));
      throw error;
    }
  };

  useEffect(() => {
    obtenerVisitas();
  }, []);

  return (
    <VisitasContext.Provider
      value={{ visitas, loading, obtenerVisitas, crearVisita }}
    >
      {children}
    </VisitasContext.Provider>
  );
};
