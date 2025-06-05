import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Carousel } from "@ant-design/react-native";
import GraphCard from "../components/GraphCard";
import { Ionicons } from "@expo/vector-icons";
import { CardPendientes, CardFinalizadas } from "../components/CardCarrousel";
import CardHome from "../components/CardHome";
import CardVisita from "../components/CardVisita";
import proximasVisitas from "../utils/proximasVisitas.json";
import { formatearDinero } from "../utils/formatearDinero";
import { Flame, UserRoundPlus, BellDot, MapPinned } from "lucide-react-native";
import { useAuth } from "../context/AuthProvider";
import { useVisitas } from "../context/VisitasProvider";

const { width } = Dimensions.get("window");

const cardData = [
  {
    title: "Nueva Visita",
    color: "#000",
    icon: <Flame size={30} color="#000" />,
  },
  {
    title: "Nuevo Cliente",
    color: "#000",
    icon: <UserRoundPlus size={30} color="#000" />,
  },
  {
    title: "Ubicaciones",
    color: "#000",
    icon: <MapPinned size={30} color="#000" />,
  },
  {
    title: "Notificaciones",
    color: "#000",
    icon: <BellDot size={30} color="#000" />,
  },
];

export default function HomeScreen() {
  const { visitas } = useVisitas();
  const { user, isAdmin } = useAuth();

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
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={require("../../assets/images/user-admin.jpeg")}
            style={styles.profileImage}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Hola, {user?.username} </Text>
          <Text style={{ fontFamily: "Inter-regular" }}>{isAdmin ? "Administrador" : "Usuario"}</Text>
        </View>

        <View style={styles.iconWrapper}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
      </View>

      <Carousel
        style={styles.carousel}
        selectedIndex={0}
        autoplay
        infinite
        autoplayInterval={8000}
        dots={false}
      >
        <View style={styles.slide}>
          <CardPendientes />
        </View>

        <View style={styles.slide}>
          <CardFinalizadas />
        </View>
      </Carousel>

      <View style={styles.grid}>
        {cardData.map((card, index) => (
          <CardHome key={index} {...card} />
        ))}
      </View>

      <View style={styles.lista}>
        <Text
          style={{ fontSize: 20, marginBottom: 15, fontFamily: "Inter-Bold" }}
        >
          Proximas Visitas
        </Text>
        <ScrollView>
          {visitas.slice(0, 4).map((item, index) => (
            <CardVisita
              key={item.id ? item.id.toString() : index.toString()}
              item={item}
              styles={styles}
              getIconName={getIconName}
              formatearDinero={formatearDinero}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Inter-Bold",
  },
  iconWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  carousel: {
    width: "100%",
    height: 240,
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  lista: {
    paddingHorizontal: 20,
    marginTop: 20,
    height: 280,
  },
});
