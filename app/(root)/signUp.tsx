import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { animations } from "@/contants";
import InputField from "@/components/InputField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import ReactNativeModal from "react-native-modal";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const accountAnimation = animations.find((item) => item.id === 4);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      const verificationResponse = await signUp.prepareEmailAddressVerification(
        {
          strategy: "email_code",
        }
      );
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err.errors?.[0]?.longMessage || "Verification failed.",
        state: "failed",
      });
    }
  };

  return (
    <LinearGradient
      colors={["#304362", "#d7d2cc"]} // Gradient colors
      start={{ x: 0, y: 0 }} // Start of the gradient
      end={{ x: 1, y: 1 }} // End of the gradient
      style={styles.gradient}
    >
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
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <InputField
              placeholder="Enter your name"
              value={form.name}
              onChangeText={(value: string) =>
                setForm({ ...form, name: value })
              }
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <InputField
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(value: string) =>
                setForm({ ...form, email: value })
              }
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <InputField
              placeholder="Enter your password"
              value={form.password}
              secureTextEntry
              onChangeText={(value: string) =>
                setForm({ ...form, password: value })
              }
            />
          </View>

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={styles.signUpButton}
          />

          <OAuth />
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account? </Text>
            <Link href="/sign-in">
              <Text style={styles.linkHighlight}>Log In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  animation: {
    width: 200,
    height: 200,
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
  signUpButton: {
    marginTop: 12,
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
    color: "#333",
  },
  linkHighlight: {
    color: "#007bff",
    fontWeight: "bold",
    marginTop: 5,
    padding: 15,
  },
});

export default SignUp;
