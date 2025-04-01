import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DetalleVisita = ({ visita }) => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Image
          source={{ uri: "https://picsum.photos/400/150" }}
          className="w-full h-40 rounded-lg mb-4 self-center"
        />
        
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Cliente</Text>
          <Text className="text-xl">{visita.cliente}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Nota</Text>
          <Text className="text-xl">{visita.nota}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Vendedor</Text>
          <Text className="text-xl">{visita.vendedor}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Fecha</Text>
          <Text className="text-xl">{visita.fecha}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Tipo</Text>
          <Text className="text-xl">{visita.tipo}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-500 mb-2">Viáticos</Text>
          <Text className="text-xl">{visita.viaticos}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetalleVisita;
