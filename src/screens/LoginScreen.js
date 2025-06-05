import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
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
        { username, password }
      );

      const jwtToken = res.data.access;
      const decoded = jwtDecode(jwtToken);
      const userId = decoded.user_id;

      const userData = {
        id: userId,
        username,
        token: jwtToken,
        groups: [],
      };
      await login(userData);
      const expoToken = await registerForPushNotificationsAsync();

      if (expoToken) {
        await enviarTokenAlBackend(expoToken, userId, jwtToken);
      } else {
        console.warn("No se obtuvo expoPushToken (LoginScreen)");
      }

    } catch (error) {
      console.error("Error en login:", error.response || error.message);
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#cad7f4",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 70,
    }}>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text></Text>
      </View>
      <Image
        source={require("../../assets/images/cubo.png")}
        style={{ position: "absolute" }}
      />

      <View style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Text style={styles.title}>W2MOVE</Text>
      

      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.signupText}>¿No tienes cuenta?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;


async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert(
      "Error",
      "Debes usar un dispositivo físico para recibir notificaciones"
    );
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permiso denegado", "No se concedieron permisos para notificaciones.");
    return null;
  }

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    return token;
  } catch (error) {
    console.error("Error al obtener el token de Expo:", error);
    return null;
  }
}


async function enviarTokenAlBackend(expoToken, userId, jwtToken) {
  try {
    const response = await fetch(
      `${config.API_CHRONOS_CRM}/api/user/user-informacion/${userId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          token_telefono: expoToken,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Error al guardar token en backend:",
        response.status,
        await response.text()
      );
    } else {
      console.log("Token guardado exitosamente en backend.");
    }
  } catch (error) {
    console.error("Error al enviar el token al backend:", error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cad7f4",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 70,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 35,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  forgotText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  signupText: {
    fontSize: 12,
    color: "blue",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 50,
    alignItems: "flex-end",
  },
  button: {
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
    fontWeight: "600",
  },
});
