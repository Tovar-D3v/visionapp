import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function ListClientes({ clientes }) {
  return (
    <View style={styles.list}>
      {clientes.map((cliente, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: cliente.color }]}>
            <AntDesign name="user" size={30} color="#000" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              {cliente.nombre} {cliente.apellidos}
            </Text>
            <View style={styles.details}>
              <Text style={styles.company}>{cliente.empresa}</Text>
              <Text style={styles.cardContent}>{cliente.cargo}</Text>
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  company: {
    borderRadius: 6,
    backgroundColor: "#e6d5ff",
    paddingHorizontal: 5,
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
  },
  arrowContainer: {
    justifyContent: "center",
  },
});
