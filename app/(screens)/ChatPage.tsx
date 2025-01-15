import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#EBF5FF", "#DCEEFF"]} // Lighter blue gradient
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/chatbot")}>
          <Ionicons name="arrow-back" size={24} color="#003F7D" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Chat</Text>
      </View>

      {/* Chat Content Placeholder */}
      <View style={styles.chatContent}>
        <Text style={styles.chatPlaceholder}>
          Your chat messages will appear here...
        </Text>
      </View>

      {/* Typing Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.typingAreaContainer}
      >
        <View style={styles.typingArea}>
          <TextInput
            placeholder="Ask me anything..."
            placeholderTextColor="#7A9ACF"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003F7D", // Blue theme
    marginLeft: 10, // Add spacing between back icon and title
  },
  chatContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chatPlaceholder: {
    fontSize: 16,
    color: "#7A9ACF", // Light blue text for placeholder
    textAlign: "center",
  },
  typingAreaContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  typingArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F9FF", // Very light blue background
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#003F7D", // Darker blue for text
  },
  sendButton: {
    backgroundColor: "#003F7D", // Blue button color
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});