import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

export function useCamera() {
  const [permisosConcedidos, setPermisosConcedidos] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        try {
          const { status: cameraStatus } =
            await ImagePicker.requestCameraPermissionsAsync();
          const { status: mediaStatus } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (cameraStatus === "granted" && mediaStatus === "granted") {
            setPermisosConcedidos(true);
          } else {
            Alert.alert(
              "Permiso denegado",
            );
          }
        } catch (error) {
          Alert.alert("Error permisos", error.message || error);
        }
      }
    })();
  }, []);

  return permisosConcedidos;
}
