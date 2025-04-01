import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native"; // Asegúrate de que View provenga de react-native
import visitas from "../utils/visitas.json";
import { formatearDinero } from "../utils/formatearDinero";

import CardVisita from "../components/CardVisita";

const VisitasScreen = ({ navigation }) => {
  const [sortedVisitas, setSortedVisitas] = useState([]);

  useEffect(() => {
    const sorted = [...visitas].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    setSortedVisitas(sorted);
  }, []);

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
        {sortedVisitas.map((item, index) => (
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