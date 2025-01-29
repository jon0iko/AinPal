import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    Alert.alert("Success", "Your message has been sent!", [
      {
        text: "OK",
        // onPress: () => navigation.navigate("Home"), // Navigate to Home page
       onPress: () => router.push("/home"),
      }
    ]);
    
  };

  return (
    <LinearGradient
      colors={["#a7c7e7", "#6a77cc"]} // Gradient colors
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contact Form</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <TextInput
          placeholder="Enter your message"
          value={message}
          onChangeText={setMessage}
          multiline
          style={styles.msgField}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3d76b3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  gradientBackground: {
    flex: 1,
  },
  inputField: {
    backgroundColor: "#f0f8ff", // Changed color
    borderRadius: 50,
    padding: 12,
    color: "#000",
    width: "100%", // Adjust this to control the width of the input field
    maxWidth: 600,
    marginBottom: 20,
  },
  msgField: {
    textAlignVertical: "top",
    backgroundColor: "#f0f8ff", // Changed color
    borderRadius: 10,
    padding: 12,
    color: "#000",
    width: "100%", // Adjust this to control the width of the input field
    maxWidth: 600,
    height: 200,
    marginBottom: 120,
  },
});
