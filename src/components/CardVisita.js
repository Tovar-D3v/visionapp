import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FormattedTime from "../utils/formatearFecha";

const CardVisita = ({ item, navigation, getIconName, formatearDinero }) => {

  const handlePress = () => {
    if (navigation) {
      navigation.navigate("DetalleVisita", { visita: item });
    } else {
      console.log("Navegación no disponible");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.itemContainer}>
        <FormattedTime date={item.fecha_visita} styles={styles} />
        <View style={styles.infoContainer}>
          <Text style={styles.cliente}>{item.nombre_cliente}</Text>
          <Text style={styles.nota}>{item.descripcion}</Text>
          <Text style={styles.vendedor}>{item.nombre_vendedor}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 }}>
            <Text
              style={{
                backgroundColor: "#FFB3BA",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              ${formatearDinero(item.viaticos)}
            </Text>
            <View
              style={{
                backgroundColor: "#e6d5ff",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons name="office-building-marker-outline" size={13} color="#000" />
              <Text>Cali Valle</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
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

export default CardVisita;