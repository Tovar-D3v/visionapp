import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function ImagenesGuardadasCarrousel({ savedImages, isLoading }) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  if (!isLoading && savedImages.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noImagesText}>No hay imagenes</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {savedImages.map((imgObj) => (
        <View key={imgObj.id} style={styles.imageWrapper}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imgObj.imagen}` }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  noImagesText: {
    fontSize: 14,
    color: "#777777",
    fontStyle: "italic",
  },
  imageWrapper: {
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
