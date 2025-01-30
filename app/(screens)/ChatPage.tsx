import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { fetchChatResponse } from "@/api/chat";

// Type Definitions
interface Message {
  type: "user" | "bot";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle sending the message
  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim()) return; // Prevent sending empty messages
    const userMessage: Message = { type: "user", content: inputText.trim() };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat

    setInputText(""); // Clear input field
    setLoading(true); // Show loading animation

    const botResponse = await fetchChatResponse(inputText.trim()); // Fetch response
    const botMessage: Message = { type: "bot", content: botResponse };
    setMessages((prev) => [...prev, botMessage]); // Add bot response to chat
    setLoading(false); // Hide loading animation
  };

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

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.type === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContent}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#003F7D" />
        </View>
      )}

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
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// Styles
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
    flexGrow: 1,
    padding: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCEEFF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#EBF5FF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#003F7D",
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
  loadingContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
});
