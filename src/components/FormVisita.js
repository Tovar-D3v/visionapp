import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormVisita() {
  const [vendedor, setVendedor] = useState("");
  const [viaticos, setViaticos] = useState("");
  const [nota, setNota] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [cliente, setCliente] = useState("");
  const [lugar, setLugar] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "flex-start", paddingHorizontal: 6, flexDirection: "col", display: "flex", gap: 8 }}>
        <Text style={styles.title}>Crear Visita</Text>
        <Text style={{fontSize: 16, fontWeight: "500", color: "#666"}}>Diligencia el formualario para crear una nueva visita y asignarsela a uno de tus vendedores</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Vendedor"
          value={vendedor}
          onChangeText={setVendedor}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar viáticos"
          value={viaticos}
          onChangeText={setViaticos}
          keyboardType="numeric"
        />

        <TextInput 
          style={styles.input}
          placeholder="Ingresar fecha de la visita"
          value={fecha}
          onChangeText={setFecha}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar cliente"
          value={cliente}
          onChangeText={setCliente}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar lugar"
          value={lugar}
          onChangeText={setLugar}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar nota"
          value={nota}
          onChangeText={setNota}
        />

        <View style={{ display: "flex", justifyContent: "flex-start", width: "100%", alignItems: "flex-start", marginTop: 20 }}>
          <TouchableOpacity style={styles.button}>
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
  },
});
