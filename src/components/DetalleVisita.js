import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DetalleVisita = ({ visita }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 10 }}>
        {visita.cliente}
      </Text>
      <Image
        source={{ uri: "https://picsum.photos/400/150" }}
        style={styles.image}
      />
      <View>
        <Text
          style={{
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Nota:
        </Text>
        <Text style={styles.input}>{visita.nota}</Text>
      </View>
      <View>
        <Text
          style={{
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Vendedor
        </Text>
        <Text style={styles.input}>{visita.vendedor}</Text>
      </View>
      <View>
        <Text
          style={{
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Fecha
        </Text>
        <Text style={styles.input}>{visita.fecha}</Text>
      </View>
      <View>
        <Text
          style={{
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Tipo
        </Text>
        <Text style={styles.input}>{visita.tipo}</Text>
      </View>
      <View>
        <Text
          style={{
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Viaticos
        </Text>
        <Text style={styles.input}>{visita.viaticos}</Text>
      </View>
    </View>
  );
};

export default DetalleVisita;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: 360,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderRadius: 100,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
