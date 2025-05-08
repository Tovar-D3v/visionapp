import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CardHome = ({ title, color, icon }) => {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <TouchableOpacity>
        <View style={[styles.card]}>
          <View style={styles.imageContainer}>
            {icon && <Text style={styles.buttonText}>{icon}</Text>}
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 65,
    height: 70,
    borderRadius: 14,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
  },
  cardImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
    fontFamily: "Inter-regular",
  },
  cardContent: {
    fontSize: 15,
    color: "#000",
    width: "90%",
    fontWeight: "500",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a213d",
    borderRadius: 100,
    width: 100,
    height: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
  },
});

export default CardHome;
