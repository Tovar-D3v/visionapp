import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import visitas from "../utils/visitas.json";
import { formatearDinero } from "../utils/formatearDinero";
import config from "../config/config";
import { useVisitas } from "../context/VisitasProvider";


import CardVisita from "../components/CardVisita";

const VisitasScreen = ({ navigation }) => {
  const { visitas, loading } = useVisitas();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const getIconName = (tipo) => {
    switch (tipo) {
      case "reunión":
        return "videocam-outline";
      case "visita":
        return "cafe-outline";
      default:
        return "event";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {visitas.map((item, index) => (
          <CardVisita
            key={item.id ? item.id.toString() : index.toString()}
            item={item}
            navigation={navigation}
            styles={styles}
            getIconName={getIconName}
            formatearDinero={formatearDinero}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
    paddingRight: 20,
    paddingVertical: 7,
  },
  infoContainer: {
    flex: 1,
  },
  cliente: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nota: {
    fontSize: 16,
    color: "#555",
  },
  vendedor: {
    fontSize: 14,
    color: "#777",
  },
  dateContainer: {
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 16,
  },
  day: {
    fontSize: 24,
    fontWeight: "bold",
  },
  month: {
    fontSize: 18,
    color: "#555",
  },
  time: {
    fontSize: 14,
    color: "#999",
  },
});

export default VisitasScreen;