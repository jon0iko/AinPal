import React, { useRef, useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { animations } from "@/contants"; // Import the animations
import InputField from "@/components/InputField"; // Assuming this is your custom component
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton"; // Assuming you have a custom button component

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play(); // Play the animation on component mount
  }, []);

  // Find the specific animation object based on id
  const accountAnimation = animations.find((item) => item.id === 4);

  // Handle sign-up button press
  const onSignUpPress = () => {
    // Handle form submission (e.g., send data to API or validation)
    console.log("Form data:", form);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.animationContainer}>
        {/* LottieView for the animation */}
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#eee",
          }}
          source={accountAnimation?.animation} // Use the animation property
        />
        {/* Display the "Create Your Account" text near the animation */}
        <Text style={styles.headerText}>Create Your Account</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputField
          label="Name"
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          className="mt-6"
        />

        {/* OAuth */}
        <Link
          href="/sign-in"
          style={{ textAlign: "center", marginTop: 10 }} // Correct style usage
        >
          <Text>Already have an account? </Text>
          <Text style={{ color: "#007bff" }}>Log In</Text>
        </Link>
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
    padding: 20,
    position: "relative", // Ensure text can be positioned relative to animation
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    position: "absolute",
    bottom: -50, // Position the text near the animation
    left: 0,
    right: 0,
    textAlign: "center", // Center the text horizontally
  },
  inputContainer: {
    padding: 20, // Adjust padding for better spacing
  },
});

export default SignUp;
