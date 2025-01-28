import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import triviaData from "@/app/utils/Trivia_data";

const TriviaCard = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [trivia, setTrivia] = useState<string | null>(null);

  useEffect(() => {
    // Select a random trivia entry whenever refreshTrigger changes
    const randomIndex = Math.floor(Math.random() * triviaData.length);
    setTrivia(triviaData[randomIndex]?.text || "No trivia found.");
  }, [refreshTrigger]);

  return (
    <LinearGradient
      colors={["#C9CCFF", "#7A89FF"]} // Gradient colors
      style={styles.cardContainer}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="bulb-outline" size={50} color="#1A4B8C" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Did You Know?</Text>
        <Text style={styles.info}>{trivia}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 45,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A4B8C",
    marginBottom: 8,
  },
  info: {
    fontSize: 15,
    color: "#343A30",
    lineHeight: 28,
  },
});

export default TriviaCard;
