import React, { useRef, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { animations } from "@/contants"; // Import the animations

const SignUp = () => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play(); // Play the animation on component mount
  }, []);

  // Find the specific animation object based on id
  const accountAnimation = animations.find((item) => item.id === 4);

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
});

export default SignUp;
