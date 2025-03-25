import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CardHome = ({ title, text, color, image }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 15,
    overflow: "visible",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    transform: [{ translateY: -45 }, { translateX: -19 }],
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    transform: [{ translateY: -35 }],
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
    transform: [{ translateY: -25 }],
  },
});

export default CardHome;
