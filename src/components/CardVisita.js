import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import FormattedTime from "../utils/formatearFecha";

const CardVisita = ({ item, navigation, getIconName, formatearDinero }) => {
  console.log("item:", item);
  return (
    <TouchableOpacity 
      className="mb-4 bg-white rounded-lg shadow-md"
      onPress={() => navigation.navigate("DetalleVisita", { visita: item })}
    >
      <View className="flex-row p-4">
        <View className="items-center justify-center w-24 border-r border-gray-200">
          <FormattedTime date={item.fecha} />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-lg font-semibold text-gray-800">{item.cliente}</Text>
          <Text className="text-sm text-gray-600 mt-1">{item.nota}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.vendedor}</Text>
          <View className="flex-row items-center mt-2 space-x-2">
            <Ionicons name={getIconName(item.tipo)} size={20} color="#4B5563" />
            <Text className="bg-red-100 text-gray-700 px-2 py-1 rounded-md">${formatearDinero(item.viaticos)}</Text>
            <View className="bg-purple-100 flex-row items-center px-2 py-1 rounded-md space-x-1">
              <MaterialCommunityIcons name="office-building-marker-outline" size={13} color="#4B5563" />
              <Text>{item.ciudad}</Text>
            </View>
          </View>
        </View>
        <View className="justify-center">
          <Ionicons name="chevron-forward" size={24} color="#4B5563" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardVisita;