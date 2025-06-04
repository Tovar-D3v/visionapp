import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function SettingsScreen() {
  const { user } = useAuth();
  const { height } = Dimensions.get("window");

  console.log("user", user);    

  return (
    <View style={[styles.container, { height }]}>
      <Text>Ajustes user</Text>
      <Text>Alto de la pantalla: {height}px</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
