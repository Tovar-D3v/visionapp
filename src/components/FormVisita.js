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

export default function FormVisita() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [viaticos, setViaticos] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [cliente, setCliente] = useState("");
  const [vendedor, setVendedor] = useState("");

  const { crearVisita } = useVisitas();

  const handleSubmit = async () => {
    try {
      const data = {
        titulo,
        descripcion,
        viaticos,
        fecha_visita: fecha,
        creador_visita_id: 1,
        cliente_id: 20,
        nombre_cliente: cliente,
        nombre_vendedor: vendedor,
      };

      await crearVisita(data);
      Alert.alert("Éxito", "La visita fue creada correctamente.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          paddingHorizontal: 6,
          flexDirection: "col",
          display: "flex",
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
          placeholder="Fecha de la visita"
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
            display: "flex",
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderRadius: 100,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
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
  },
});
