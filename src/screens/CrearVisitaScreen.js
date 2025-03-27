import React from "react";
import { View } from "react-native";
import FormVisita from "../components/FormVisita";

export default function CrearVisitaScreen() {
  const handleFormSubmit = (data) => {
    console.log("Datos de la visita:", data);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormVisita onSubmit={handleFormSubmit} />
    </View>
  );
}
