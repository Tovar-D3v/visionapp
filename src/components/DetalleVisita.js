import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useCamera } from "../hooks/use-permisos-camara";
import { useLocalizacion } from "../hooks/use-permisos-localizacion";
import { formatDateToDisplay } from "../utils/formatearFechaBd";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useGuardarImagenes } from "../hooks/use-guardar-imagenes";
import ImagenesGuardadasCarrousel from "../components/CarrouselImagenesGuardadas";
import CapturarImagenesSeccion from "../components/CapturarImagen";
import GuardarImagenBoton from "../components/GuardarImagen";

import config from "../config/config";

const DetalleVisita = ({ visita }) => {
  const {
    id,
    nombre_cliente,
    titulo,
    descripcion,
    nombre_vendedor,
    fecha_visita,
    viaticos,
  } = visita;

  const permisosConcedidos = useCamera();
  const { recorriendo, toggleRecorrido } = useLocalizacion(id);

  const [imageUri, setImageUri] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    savedImages,
    isLoading: isLoadingImages,
    refetch: refetchImages,
  } = useGuardarImagenes(id);

  const handleTakePhoto = async () => {
    if (!permisosConcedidos) {
      try {
        const { status: newCameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { status: newMediaStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newCameraStatus !== "granted" || newMediaStatus !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "Para usar la cámara debes otorgar permisos en Configuración."
          );
          return;
        }
      } catch (error) {
        Alert.alert("Error permisos", error.message || error);
        return;
      }
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: false,
      });
      if (!result.canceled && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error cámara", error.message || error);
    }
  };

  const handleSaveImage = async () => {
    if (!imageUri) {
      Alert.alert("Sin foto", "Primero toma una foto antes de guardar.");
      return;
    }
    setIsSaving(true);

    try {
      const base64img = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const payload = {
        imagen: base64img,
        visitaId: id,
      };

      const response = await fetch(`${config.API_VISITAS}/imagenes-visitas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText}\n${text}`
        );
      }

      await response.json();
      Alert.alert("Éxito", "Imagen guardada correctamente.");
      setImageUri(null);
      refetchImages();
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      Alert.alert("Error al guardar", error.message || error.toString());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.clienteText}>{nombre_cliente}</Text>
        <Text style={styles.tituloText}>{titulo}</Text>
      </View>

      {/* --- IMÁGENES GUARDADAS (hook + componente) --- */}
      <View style={styles.savedSection}>
        <Text style={styles.labelSection}>Imágenes guardadas</Text>
        <ImagenesGuardadasCarrousel
          savedImages={savedImages}
          isLoading={isLoadingImages}
        />
      </View>

      <CapturarImagenesSeccion
        imageUri={imageUri}
        handleTakePhoto={handleTakePhoto}
      />

      {imageUri && (
        <GuardarImagenBoton onSave={handleSaveImage} isSaving={isSaving} />
      )}

      <View style={styles.infoSection}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{descripcion}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Vendedor asignado</Text>
        <Text style={styles.value}>{nombre_vendedor}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Fecha de visita</Text>
        <Text style={styles.value}>{formatDateToDisplay(fecha_visita)}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Viáticos</Text>
        <Text style={styles.value}>${viaticos.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleRecorrido}>
          <Text style={styles.buttonText}>
            {recorriendo ? "Finalizar recorrido" : "Comenzar recorrido"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetalleVisita;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  clienteText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a2a2a",
    textAlign: "center",
  },
  tituloText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555555",
    marginTop: 4,
    textAlign: "center",
  },

  savedSection: {
    marginBottom: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelSection: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },

  infoSection: {
    marginBottom: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: "#2a2a2a",
    lineHeight: 22,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
