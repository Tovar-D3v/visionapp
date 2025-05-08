// src/components/GraphCard.js
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraphCard({ title, data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={data}
        width={screenWidth * 0.9}
        height={140}
        chartConfig={graficoEstilos}
        bezier
        withShadow={false}
        withInnerLines={false}
        fromZero
        segments={4}
      />
    </View>
  );
}

const graficoEstilos = {
  backgroundGradientFrom: "#000000",
  backgroundGradientTo: "#000000",
  color: () => `rgba(255, 255, 255, 1)`,
  labelColor: () => "#FFFFFF",
  strokeWidth: 1,
  decimalPlaces: 0,
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#fff",
  },
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121212",
    borderRadius: 23,
    padding: 16,
    marginVertical: 12,
    alignItems: "center",
    width: "90%",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
