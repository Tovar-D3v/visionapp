import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import config from "../config/config";

export function useGuardarImagenes(visitaId) {
  const [savedImages, setSavedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${config.API_VISITAS}/imagenes-visitas/visita/${visitaId}`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText}\n${text}`
        );
      }

      const data = await response.json();
      setSavedImages(data);
    } catch (err) {
      console.error("Error al obtener imágenes:", err);
      setError(err.message || err.toString());
      Alert.alert("Error al cargar imágenes", err.message || err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [visitaId]);

  useEffect(() => {
    fetchSavedImages();
  }, [fetchSavedImages]);

  return {
    savedImages,
    isLoading,
    error,
    refetch: fetchSavedImages,
  };
}