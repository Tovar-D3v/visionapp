import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import clientes from "../utils/clientes.json";
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import ListClientes from "../components/ListClientes";

export default function ClientesScreen() {
  const [search, setSearch] = useState("");
  const [filteredClientes, setFilteredClientes] = useState(clientes);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = clientes.filter((cliente) =>
      `${cliente.nombre} ${cliente.apellidos}`
        .toLowerCase()
        .includes(text.toLowerCase())
    );
    setFilteredClientes(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 16, alignContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Crear cliente</Text>
        </TouchableOpacity>
      </View>

      

      {/* ✅ Se usa el componente modularizado */}
      <ListClientes clientes={filteredClientes} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    width: "60%",
  },
  list: {
    width: "90%",
    marginBottom: 100,
  },
  card: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 20,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  cardText: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
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
});