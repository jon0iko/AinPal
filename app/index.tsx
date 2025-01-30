import React, { useEffect } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();

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
        // Hide the splash screen once we're done
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
        await SplashScreen.hideAsync();
      }
    };
    checkOnboardingStatus();
  }, [router]);

  return null;
}
