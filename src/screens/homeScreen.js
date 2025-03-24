import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const cardData = [
  {
    title: "Nueva visita",
    text: "Registra una nueva visita",
    color: "#ffe28b",
    image: require("../../assets/images/fire.png"),
  },
  {
    title: "Ubicación",
    text: "Revisa la ubicación de tus vendedores",
    color: "#d9eeff",
    image: require("../../assets/images/location.png"),
  },
  {
    title: "Notificaciones",
    text: "Consulta tus notificaciones aquí",
    color: "#e6d5ff",
    image: require("../../assets/images/notifications.png"),
  },
  {
    title: "Dashboard",
    text: "Accede a tu dashboard",
    color: "#ffd9d3",
    image: require("../../assets/images/dashboard.png"),
  },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Bienvenido al Inicio, Wilfred</Text>
        <Image source={require("../../assets/images/user-admin.jpeg")} style={styles.profileImage} />
      </View>

      //TODO: Ingresar esto a un componente llamado CardHome y solo importarlo aquí
      <View style={styles.grid}>
        {cardData.map((card, index) => (
          <View key={index} style={[styles.card, { backgroundColor: card.color }]}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardContent}>{card.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    height: "100%",
  },
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    width: "60%",
  },
  grid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
  },
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
    overflow: 'visible', 
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