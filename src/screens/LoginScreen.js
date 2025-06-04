import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import config from "../config/config";

const LoginScreen = ({ navigation }) => {
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, [user]);

  const [username, setUsername] = useState("leon");
  const [password, setPassword] = useState("Indelp@2023");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor completa los campos");
      return;
    }
  
    try {
      const res = await axios.post(
        `${config.API_AUTENTICACION}/auth/api/token/`,
        {
          username,
          password,
        }
      );
  
      const userData = {
        username,
        email: res.data.email,
        token: res.data.access,
        groups: res.data.groups,
      };
  
      await login(userData);
    } catch (error) {
      Alert.alert("Error, usuario o contraseña incorrectos");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#cad7f4",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 70,
      }}
    >
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text></Text>
      </View>

      <Image
        source={require("../../assets/images/cubo.png")}
        style={{ position: "absolute" }}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Text style={{ marginBottom: 35, fontSize: 42, fontWeight: "bold" }}>
          W2MOVE
        </Text>

        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          style={{
            width: "80%",
            marginBottom: 10,
            padding: 15,
            borderRadius: 20,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={{
            width: "80%",
            marginBottom: 10,
            padding: 15,
            borderRadius: 20,
            backgroundColor: "#fff",
          }}
        />
        <Text style={{ fontSize: 12, color: "#000", fontWeight: "600" }}>
          ¿Olvidaste tu contraseña?
        </Text>
        <Text style={{ fontSize: 12, color: "blue", fontWeight: "600" }}>
          ¿No tienes cuenta?
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 50,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
