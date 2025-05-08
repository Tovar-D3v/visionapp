import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ListClientes from "../components/ListClientes";
import { useClientes } from "../context/ClientesProvider";

export default function ClientesScreen() {
  const { clientes, loading, obtenerClientes } = useClientes(); 
  const [search, setSearch] = useState("");
  const [filtrarClientes, setFiltrarClientes] = useState([]);

  useEffect(() => {
    obtenerClientes();
  }, []);

  useEffect(() => {
    setFiltrarClientes(
      clientes.filter((cliente) =>
        `${cliente.nombre} ${cliente.apellidos}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [clientes, search]);

  const funcionBuscar = (text) => {
    setSearch(text);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente"
            value={search}
            onChangeText={funcionBuscar}
          />
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginTop: 16,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Crear cliente</Text>
        </TouchableOpacity>
      </View>

      <ListClientes clientes={filtrarClientes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f6f9",
    borderRadius: 18,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    marginTop: 7,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    width: "60%",
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 6,
    marginTop: 6,
    borderWidth: 1,
    justifyContent: "center",
    marginRight: 6,
    paddingVertical: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});