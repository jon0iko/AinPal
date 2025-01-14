import { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
      const { isSignedIn } = useAuth();

      if (isSignedIn) {
        return <Redirect href={"/(root)/(tabs)/home"} />;
      }
    // Reset onboarding status on each app start (for testing purposes)
    useEffect(() => {
        const resetOnboarding = async () => {
            await AsyncStorage.removeItem('onboarded');
            console.log('Onboarding reset');  // Debugging line
        };
        resetOnboarding();
    }, []);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const onboarded = await AsyncStorage.getItem('onboarded');
            console.log("Onboarding Status:", onboarded);  // Debugging line
            if (onboarded === 'true') {
                console.log("Navigating to home...");
                router.replace('/(root)/(tabs)/home');  // Navigate to home if onboarding complete
            } else {
                console.log("Redirecting to Onboarding...");
                router.replace('/onboarding');  // Show onboarding if not completed
            }
        };
        checkOnboardingStatus();
    }, []);

    return null;
}
