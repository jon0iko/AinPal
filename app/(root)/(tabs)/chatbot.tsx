import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Chatbot() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/(root)/(tabs)/home")}
      >
        <Ionicons name="arrow-back" size={24} color="#34495e" />
      </TouchableOpacity>

      {/* Logo/Image Wrapper */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/AILogo.png")}
          style={styles.logo}
          resizeMode="contain" // Ensure the image fits within the container
        />
      </View>

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome PAL!</Text>
      <Text style={styles.subtitle}>
        Confused about which law applies for you? 
        Need quick insights?{"\n"}
      </Text>

      {/* Gradient Start Chatting Button */}
      <TouchableOpacity onPress={() => router.push("/(screens)/ChatPage")}>
        <LinearGradient
          colors={["#003f7d", "#00509e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Start Chatting</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBF2FA", // Background color
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40, // Adjust for status bar
    left: 20,
  },
  imageContainer: {
    width: 170, // Slightly larger than the image
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Add padding around the image
  },
  logo: {
    width: "100%", // Ensure it fills the container
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  // add drop shadow to the button
  startButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
