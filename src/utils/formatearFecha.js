import React from "react";
import { View, Text } from "react-native";

const FormattedTime = ({ date, styles }) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString("default", { month: "short" });
  const time = formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.month}>{month}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

export default FormattedTime;