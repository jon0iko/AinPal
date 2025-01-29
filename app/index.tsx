import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import { useAuth } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

export default function Index() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
      async function prepare() {
        try {
       
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
 
          setAppIsReady(true);
        //  SplashScreen.hide();
        await SplashScreen.hideAsync();
        }
      }

      prepare();
    }, []);


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

   if (!appIsReady) {
     return null;
   }

   if (isSignedIn) {
     return <Redirect href={"/(root)/(tabs)/home"} />;
   }

  return (
    <View>
      <Text>App is ready.</Text>
    </View>
  );
}
