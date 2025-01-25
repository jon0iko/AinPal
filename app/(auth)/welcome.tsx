import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { useSignIn } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import OAuth from "@/components/OAuth";

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
    <LinearGradient
      colors={["#304352", "#d7d2cc"]} // Gradient colors
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.animationContainer}>
          <Text style={styles.headerText}>Welcome 👋</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <InputField
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(value: any) => setForm({ ...form, email: value })}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <InputField
              placeholder="Enter your password"
              value={form.password}
              secureTextEntry
              onChangeText={(value: any) =>
                setForm({ ...form, password: value })
              }
            />
          </View>

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            style={styles.signUpButton}
          />

          <OAuth />
          {/* Forgot Password Navigation */}
          <View style={styles.linkContainer}>
            <Link href="/(auth)/forgotPassword" style={styles.linkHighlight}>
              Forgot Password?
            </Link>
          </View>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Don't have an account? </Text>
            <Link href="/(root)/signUp" style={styles.linkSignUp}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff", // Adjusted for gradient contrast
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
    color: "#fff", // Adjusted for gradient contrast
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
    borderRadius: 50,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#fff", // Adjusted for gradient contrast
  },
  linkHighlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
  linkSignUp: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignIn;
