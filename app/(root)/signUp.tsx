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
import InputField from "@/components/InputField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import OAuth from "@/components/OAuth";
import { LinearGradient } from "expo-linear-gradient";
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default", // Adjusted to include a "default" state
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      console.log("Verification Response:", verificationResponse);

      setVerification({
        ...verification,
        state: "pending",
      });
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
      colors={["#a7c7e7", "#6a77cc"]}
      style={styles.gradientBackground}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Create Your Account</Text>
        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <InputField
              placeholder="Enter your name"
              value={form.name}
              onChangeText={(value: string) =>
                setForm({ ...form, name: value })
              }
              style={styles.containerField}
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
              style={styles.containerField}
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
              style={styles.containerField}
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

          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true);
            }}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Verification</Text>
              <Text>
                We've sent a verification code to {form.email}. Please enter it
                below.
              </Text>
              <View style={{ marginBottom: 25 }}>
                <InputField
                  placeholder="Enter code"
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code: any) =>
                    setVerification({ ...verification, code })
                  }
                />
              </View>
              {verification.error && (
                <Text style={{ color: "red" }}>{verification.error}</Text>
              )}
              <CustomButton title="Verify Email" onPress={onPressVerify} />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View style={styles.modalContainer}>
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkImage}
              />
              <Text style={styles.modalText}>Verified</Text>
              <Text style={styles.Texting}>
                You have successfully verified your account.
              </Text>
              <CustomButton
                title="Go to Home"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/home");
                }}
                style={{ marginTop: 20 }}
              />
            </View>
          </ReactNativeModal>
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
    flex: 1,
    // backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
    alignSelf: "center",
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
    backgroundColor: "#3d76b3",
    padding: 15,
    borderRadius: 50,
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
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    left: 110,
  },
  Texting: {
    textShadowColor: "#A0A0A0",
  },
  checkImage: {
    width: 100,
    height: 100,
    left: 100,
  },
  containerField: {
    backgroundColor: "#f0f8ff", // Changed color
    borderRadius: 50,
    padding: 14,
    color: "#000",
  },
});

export default SignUp;
