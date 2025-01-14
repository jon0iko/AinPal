import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useSignIn } from "@clerk/clerk-expo";
import Icon from "react-native-vector-icons/FontAwesome";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home"); // Navigate to the home screen
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0]?.longMessage || "An error occurred");
    }
  }, [isLoaded, form]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.animationContainer}>
        <Text style={styles.headerText}>Welcome 👋</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <InputField
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            style={styles.inputField}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Password</Text>
          <InputField
            placeholder="Enter your password"
            value={form.password}
            secureTextEntry
            onChangeText={(value) => setForm({ ...form, password: value })}
            style={styles.inputField}
          />
        </View>

        <CustomButton
          title="Sign In"
          onPress={onSignInPress}
          style={styles.signUpButton}
        />

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => console.log("Google Sign-In logic here")}
        >
          <Icon name="google" size={20} color="#4285F4" />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Forgot Password Navigation */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/forgotPassword")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkHighlight}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(root)/signUp")}>
            <Text style={styles.linkSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
  },
  inputContainer: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
  },
  googleButtonText: {
    marginLeft: 10,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#333",
  },
  linkHighlight: {
    color: "#007bff",
    fontWeight: "bold",
    left:0,
  },
  linkSignUp: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignIn;
