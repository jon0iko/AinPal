import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { animations } from "@/contants";
import InputField from "@/components/InputField";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const accountAnimation = animations.find((item) => item.id === 4);

  const onSignUpPress = () => {
    console.log("Form data:", form);
  };

  const onGoogleSignInPress = () => {
    console.log("Sign in with Google pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={styles.animation}
          source={accountAnimation?.animation}
        />
        <Text style={styles.headerText}>Create Your Account</Text>
      </View>

      <View style={styles.inputContainer}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <InputField
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            style={styles.inputField}
          />
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <InputField
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            style={styles.inputField}
          />
        </View>

        {/* Password Field */}
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

        {/* Sign Up Button */}
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          style={styles.signUpButton}
        />

        {/* OR Text
        <Text style={styles.orText}>Or</Text> */}

        {/* Google Sign In Button with Icon */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleSignInPress}
        >
          <Icon name="google" size={20} color="#4285F4" /> {/* Google icon */}
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Link to Log In */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Link href="/sign-in">
            <Text style={styles.linkHighlight}>Log In</Text>
          </Link>
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
  animation: {
    width: 200,
    height: 200,
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  fieldContainer: {
    marginBottom: 0,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: -15,
    fontWeight: "500",
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
    paddingLeft: 15,
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  orText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  googleButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#fff",
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#333",
    fontSize: 14,
  },
  linkHighlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignUp;
