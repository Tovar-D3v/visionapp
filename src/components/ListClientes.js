import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function ListClientes({ clientes }) {
  return (
    <ScrollView style={styles.list}>
      {clientes.map((cliente, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: cliente.color || "#ccc" }]}>
            <AntDesign name="user" size={30} color="#000" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              {cliente.nombre_cliente || ""} {cliente.apellido_cliente || ""}
            </Text>
            <View style={styles.details}>
              <Text style={styles.compania} numberOfLines={1}>
                {cliente.sede_empresa?.empresa?.nombre_empresa || "Sin sede"}
              </Text>
              <Text style={styles.cardContent}>{cliente.cargo || "Sin cargo"}</Text>
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginBottom: 100,
    backgroundColor: "#fff",
    paddingTop: 5,
    paddingHorizontal: 20,
    height: "77%",
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
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
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
  details: {
    flexDirection: "row",
    gap: 7,
    marginTop: 5,
  },
  compania: {
    borderRadius: 6,
    backgroundColor: "#e6d5ff",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    maxWidth: 150,
    overflow: "hidden",
    fontWeight: 500,
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
  },
  arrowContainer: {
    justifyContent: "center",
  },
});