import React, { useEffect } from "react";
import { Redirect, useRouter } from "expo-router"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { isSignedIn } = useAuth();
  const router = useRouter(); 
  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  useEffect(() => {
    const resetOnboarding = async () => {
      try {
        await AsyncStorage.removeItem("onboarded");
        console.log("Onboarding reset"); 
      } catch (error) {
        console.error("Failed to reset onboarding status:", error);
      }
    };
    resetOnboarding();
  }, []);


  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboarded = await AsyncStorage.getItem("onboarded");
        console.log("Onboarding Status:", onboarded); 

        if (onboarded === "true") {
          console.log("Navigating to home...");
          router.replace("/(root)/(tabs)/home");
        } else {
          console.log("Redirecting to Onboarding...");
          router.replace("/onboarding"); 
        }
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
      }
    };
    checkOnboardingStatus();
  }, [router]);

  return null; 
}
