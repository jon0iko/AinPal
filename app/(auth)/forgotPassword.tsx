import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import CustomButton from "@/components/CustomButton"; // Use your custom button component
import { router } from "expo-router";

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
    <View style={styles.container}>
      <Text style={styles.headerText}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomButton title="Send Reset Link" onPress={handleReset} />

      <CustomButton
        title="Back to Sign In"
        onPress={() => router.push("../signIn")}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ForgotPassword;
