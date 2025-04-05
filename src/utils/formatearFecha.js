import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FormattedTime = ({ date, styles = {} }) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString("default", { month: "short" });
  const time = formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Combine default styles with passed styles
  const combinedStyles = {
    dateContainer: { ...defaultStyles.dateContainer, ...styles.dateContainer },
    day: { ...defaultStyles.day, ...styles?.day },
    month: { ...defaultStyles.month, ...styles?.month },
    time: { ...defaultStyles.time, ...styles?.time },
  };

  return (
    <View style={combinedStyles.dateContainer}>
      <Text style={combinedStyles.day}>{day}</Text>
      <Text style={combinedStyles.month}>{month}</Text>
      <Text style={combinedStyles.time}>{time}</Text>
    </View>
  );
};

// Default styles that will be used if no styles are provided
const defaultStyles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormattedTime;