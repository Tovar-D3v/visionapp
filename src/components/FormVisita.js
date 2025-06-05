import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useVisitas } from "../context/VisitasProvider";
import { useAuth } from "../context/AuthProvider";
import config from "../config/config";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function FormVisita() {
  const { crearVisita } = useVisitas();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [viaticos, setViaticos] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [cliente, setCliente] = useState("");
  const [vendedor, setVendedor] = useState("");


  const sendPushNotification = async (expoPushToken, title, body) => {
    console.log(
      expoPushToken
    );
    try {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: title,
        body: body,
      };
      const response = await fetch(
        "https://exp.host/--/api/v2/push/send",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );
      const data = await response.json();
      console.log(
        "[FormVisita] -> sendPushNotification: Respuesta Expo",
        data
      );
    } catch (error) {
      console.error(
        "[FormVisita] -> sendPushNotification: Error enviando push a",
        expoPushToken,
        error
      );
    }
  };

  const notifyAllExceptCreator = async (creatorId) => {
    const url = `${config.API_CHRONOS_CRM}/api/user/user-informacion/`;
    console.log(
      url
    );

    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(
        resp.status
      );

      if (!resp.ok) {
        const detalle = await resp.json();
        console.warn(
          resp.status,
          detalle
        );
        return;
      }

      const json = await resp.json();
      const listaUsuarios = json.usuarios_informacion || [];
      console.log(
        listaUsuarios
      );

      const tokensAEnviar = listaUsuarios
        .filter(
          (u) =>
            u.token_telefono &&
            u.token_telefono.startsWith("ExponentPushToken") &&
            u.id !== creatorId
        )
        .map((u) => u.token_telefono);

      console.log(
        tokensAEnviar
      );

      const notificationTitle = `Nueva visita: ${titulo}`;
      const notificationBody = `Visita para cliente "${cliente}" en ${fecha}.`;

      await Promise.all(
        tokensAEnviar.map((expoToken) =>
          sendPushNotification(expoToken, notificationTitle, notificationBody)
        )
      );
    } catch (error) {
      console.error(
        error
      );
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Debes iniciar sesión para crear una visita.");
      return;
    }

    const data = {
      titulo,
      descripcion,
      viaticos,
      fecha_visita: fecha,
      creador_visita_id: user.id,
      cliente_id: 20,
      nombre_cliente: cliente,
      nombre_vendedor: vendedor,
    };

    try {
      console.log("data:", data);

      const nuevaVisita = await crearVisita(data);
      console.log(
        nuevaVisita
      );
      Alert.alert("Éxito", "La visita fue creada correctamente.");
      await notifyAllExceptCreator(user.id);

      setTitulo("");
      setDescripcion("");
      setViaticos("");
      setFecha(new Date().toISOString().split("T")[0]);
      setCliente("");
      setVendedor("");
    } catch (error) {
      if (error.response) {
        console.log(
          "error:",
          error.response.status
        );
        console.log(
          "error",
          error.response.data
        );
        Alert.alert(
          "Error al crear visita",
          `Servidor respondió: ${JSON.stringify(error.response.data)}`
        );
      } else {
        Alert.alert("Error", "Error al comunicarse con el servidor.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          paddingHorizontal: 6,
          gap: 8,
        }}
      >
        <Text style={styles.title}>Crear Visita</Text>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#666" }}>
          Diligencia el formulario para crear una nueva visita y asignársela a
          uno de tus vendedores
        </Text>
      </View>

      <View style={{ width: "100%", gap: 5 }}>
        <TextInput
          style={styles.input}
          placeholder="Título de la visita"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <TextInput
          style={styles.input}
          placeholder="Viáticos"
          value={viaticos}
          onChangeText={setViaticos}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha de la visita (YYYY-MM-DD)"
          value={fecha}
          onChangeText={setFecha}
        />

        <TextInput
          style={styles.input}
          placeholder="Cliente"
          value={cliente}
          onChangeText={setCliente}
        />

        <TextInput
          style={styles.input}
          placeholder="Vendedor asignado"
          value={vendedor}
          onChangeText={setVendedor}
        />

        <View
          style={{
            marginTop: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 80,
    backgroundColor: "#fff",
    flex: 1,
    gap: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderRadius: 100,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 11,
    borderRadius: 100,
    paddingHorizontal: 60,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
});
