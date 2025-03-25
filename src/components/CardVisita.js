import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardVisita = ({ item, navigation, styles, getIconName, formatearDinero }) => {
  const date = new Date(item.fecha);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <TouchableOpacity onPress={() => navigation.navigate("DetalleVisita", { visita: item })}>
      <View style={styles.itemContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.cliente}>{item.cliente}</Text>
          <Text style={styles.nota}>{item.nota}</Text>
          <Text style={styles.vendedor}>{item.vendedor}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 }}>
            <Ionicons name={getIconName(item.tipo)} size={20} color="#000" style={styles.icon} />
            <Text>${formatearDinero(item.viaticos)}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardVisita;
