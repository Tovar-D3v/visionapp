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
    console.log("[VisitasContext] -> obtenerVisitas: Iniciando petición a", url);
    setLoading(true);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(
        "[VisitasContext] -> obtenerVisitas: respuesta recibida",
        response.status,
        response.data
      );
      setVisitas(response.data);
    } catch (error) {
      const detalle = error.response
        ? error.response.data
        : error.message;
      console.error(
        "[VisitasContext] -> obtenerVisitas: Error al obtener las visitas",
        detalle
      );
      alert("Error al obtener las visitas: " + JSON.stringify(detalle));
    } finally {
      setLoading(false);
      console.log("[VisitasContext] -> obtenerVisitas: carga finalizada");
    }
  };

  const crearVisita = async (nuevaVisita) => {
    const url = `${config.API_VISITAS}/visitas`;
    console.log("[VisitasContext] -> crearVisita: Enviando a", url);
    console.log("[VisitasContext] -> crearVisita: Datos enviados", nuevaVisita);

    try {
      const response = await axios.post(url, nuevaVisita, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(
        "[VisitasContext] -> crearVisita: Visita creada, respuesta",
        response.status,
        response.data
      );
      await obtenerVisitas();
      alert("Visita creada correctamente");
      return response.data;
    } catch (error) {
      const detalle = error.response
        ? error.response.data
        : error.message;
      console.error(
        "[VisitasContext] -> crearVisita: Error al crear la visita",
        detalle
      );
      alert("Error al crear la visita: " + JSON.stringify(detalle));
      throw error;
    }
  };

  useEffect(() => {
    console.log("[VisitasContext] -> useEffect: Montando provider, obteniendo visitas");
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
