import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import FormattedTime from "../utils/formatearFecha";

const CardVisita = ({ item, navigation, styles, getIconName, formatearDinero }) => {
  console.log("item:", item);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("DetalleVisita", { visita: item })}>
      <View style={styles.itemContainer}>
        <FormattedTime date={item.fecha} styles={styles} />
        <View style={styles.infoContainer}>
          <Text style={styles.cliente}>{item.cliente}</Text>
          <Text style={styles.nota}>{item.nota}</Text>
          <Text style={styles.vendedor}>{item.vendedor}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 }}>
            <Ionicons name={getIconName(item.tipo)} size={20} color="#000" style={styles.icon} />
            <Text style={{backgroundColor: "#FFB3BA", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}>${formatearDinero(item.viaticos)}</Text>
            <View style={{backgroundColor: "#e6d5ff", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}> 
              <MaterialCommunityIcons name="office-building-marker-outline" size={13} color="#000" />
              <Text>{item.ciudad}</Text>
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

export default CardVisita;