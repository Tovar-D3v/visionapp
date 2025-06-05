import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CapturarImagenesSeccion({ imageUri, handleTakePhoto }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.imageWrapper}
      onPress={handleTakePhoto}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Image
          source={{ uri: "https://picsum.photos/800/300" }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          {imageUri ? "Cambiar foto" : "Tomar foto"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
