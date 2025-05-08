// src/screens/WelcomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function WelcomeScreen({ navigation }) {
  const handleStart = () => {
    navigation.replace("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VISION APP</Text>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text style={styles.bienvenido}>Bienvenido Wilfred Tovar!</Text>
      </View>

      {/* <Image source={require("../../assets/images/cubo.png")} style={{position: "absolute"}}/> */}

      <View
        style={{
          width: "100%",
          paddingHorizontal: 50,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Empezar →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cad7f4",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 70,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000",
    fontWeight: "700",
  },
  bienvenido: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2a213d",
    marginBottom: 30,
    width: "80%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a213d",
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
  },
});
