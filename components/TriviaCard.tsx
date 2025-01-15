import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TriviaCard = () => {
  return (
    <LinearGradient
      colors={["#C9CCFF", "#7A89FF"]} // Darker gradient using darker primary shades
      style={styles.cardContainer}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="bulb-outline" size={40} color="#1A4B8C" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Did You Know?</Text>
        <Text style={styles.info}>
          The Bangladesh Labour Act, 2006 guarantees maternity leave of 16 weeks
          (8 weeks before and 8 weeks after delivery) for working women.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A4B8C", // Specified blue color
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#343A30", // Neutral-500
    lineHeight: 20,
  },
});

export default TriviaCard;
