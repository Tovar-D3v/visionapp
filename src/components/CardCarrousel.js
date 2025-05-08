import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

export function CardPendientes() {
  return (
    <View style={[styles.card, { backgroundColor: "#121212" }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 6,
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              marginTop: 10,
              width: "70%",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>Visitas</Text>
            <Text style={styles.title}>Pendientes</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9b233",
              width: 60,
              height: 60,
              borderRadius: 50,
              marginRight: 10,
            }}
          >
            <Feather name="coffee" size={40} color="black" />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.body}>32</Text>
        </View>
      </View>
    </View>
  );
}

export function CardFinalizadas() {
  return (
    <View style={[styles.card, { backgroundColor: "#121212" }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 6,
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
              marginTop: 10,
              width: "70%",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>Visitas</Text>
            <Text style={styles.title}>Finalizadas</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#22ca4b",
              width: 60,
              height: 60,
              borderRadius: 50,
              marginRight: 10,
            }}
          >
            <MaterialIcons name="flag" size={40} color="black" />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.body}>145</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 23,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 15,
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    height: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Inter-Bold"
    
  },
  body: {
    fontSize: 56,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "Inter-Bold"
  },
});
