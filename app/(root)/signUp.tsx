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
import { animations } from "@/contants";
import InputField from "@/components/InputField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

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
            onChangeText={(value) => setForm({ ...form, name: value })}
            style={styles.inputField}
          />
        </View>

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
          title="Sign Up"
          onPress={onSignUpPress}
          style={styles.signUpButton}
        />

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => console.log("Google Sign-In logic here")}
        >
          <Icon name="google" size={20} color="#4285F4" />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

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
            <InputField
              placeholder="Enter code"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text style={{ color: "red" }}>{verification.error}</Text>
            )}
            <CustomButton title="Verify Email" onPress={onPressVerify} />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Verified</Text>
            <Image
              source={require("../../assets/images/check.png")}
              style={styles.checkImage}
            />
            <Text>You have successfully verified your account.</Text>
            <CustomButton
              title="Go to Home"
              onPress={() => router.push("/home")}
            />
          </View>
        </ReactNativeModal>
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
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkImage: {
    width: 100,
    height: 100,
    left: 100,
  },
});

export default SignUp;
