import { useState, useRef, useCallback, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { enviarLocalizacion } from "../services/LocalizacionService";

export function useLocalizacion(visitaId) {
  const [recorriendo, setRecorriendo] = useState(false);
  const intervalRef = useRef(null);

  const startRecorrido = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso de ubicación denegado",
        "Necesitamos tu ubicación para iniciar el recorrido."
      );
      return;
    }

    try {
      const locInit = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log(
        `inicial ${new Date().toISOString()} - lat: ${
          locInit.coords.latitude
        }, lon: ${locInit.coords.longitude}`
      );
      await enviarLocalizacion(locInit.coords, visitaId);
    } catch (err) {
      console.log("Error ubicación inicial:", err);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        console.log(
          `${new Date().toISOString()} - lat: ${
            loc.coords.latitude
          }, lon: ${loc.coords.longitude}`
        );
        await enviarLocalizacion(loc.coords, visitaId);
      } catch (err) {
        console.log("Error ubicación:", err);
      }
    }, 60000);

    setRecorriendo(true);
  }, [visitaId]);

  const stopRecorrido = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setRecorriendo(false);
    console.log("Finalizado");
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const toggleRecorrido = () => {
    recorriendo ? stopRecorrido() : startRecorrido();
  };

  return { recorriendo, toggleRecorrido };
}
