import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function GuardarImagenBoton({ onSave, isSaving }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isSaving && styles.disabledButton]}
        onPress={onSave}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Guardar imagen</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
