import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import CustomButton from "@/components/CustomButton"; // Use your custom button component
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    Alert.alert("Password Reset", `Reset link sent to ${email}`);
  };

  return (
    <LinearGradient
      colors={["#a7c7e7", "#6a77cc"]} // Gradient colors
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Forgot Password</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputField}
        />

        <CustomButton
          title="Send Reset Link"
          onPress={handleReset}
          style={styles.resetButton}
        />

        <CustomButton
          title="Back to Sign In"
          onPress={() => router.push("../sign-in")}
          style={styles.resetButton}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
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
  resetButton: {
    backgroundColor: "#3d76b3", // Green color for reset button
    padding: 12,
    borderRadius: 50,
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
});

export default ForgotPassword;
