import { useState, useEffect, useRef } from "react";

const useWebSocket = (url) => {
  const [data, setData] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const socket = new WebSocket(url);

    isMounted.current = true;

    socket.onmessage = (event) => {
      if (!isMounted.current) return;
      try {
        const parsedData = JSON.parse(event.data);
        const transformedData = parsedData.map((visita) => ({
          id: visita.id,
          descripcion: visita.descripcion,
          titulo: visita.titulo,
          viatico: visita.viatico ? visita.viatico : 0,
          fecha_visita: visita.fecha_visita ? visita.fecha_visita : "No se asignó fecha",
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      if (isMounted.current) {
        console.error("WebSocket Error:", error);
      }
    };

    socket.onclose = () => {
      if (isMounted.current) {
        console.log("WebSocket cerrado");
      }
    };

    return () => {
      isMounted.current = false;
      socket.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
