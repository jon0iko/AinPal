import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('onboarded', 'true');
        router.replace('/(root)/(tabs)/home');  // Navigate to home
    };

    // Function to go to the next slide
    const goToNextSlide = () => {
        swiperRef.current?.scrollBy(1);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={completeOnboarding}
                style={{ alignSelf: 'flex-end', padding: 16 }}
            >
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Skip</Text>
            </TouchableOpacity>

            <Swiper ref={swiperRef} loop={false}>
                
                {/* Slide 1 */}
                <View style={styles.slide}>
                    <Text style={styles.text}>Welcome to the App!</Text>
                    <TouchableOpacity
                        onPress={goToNextSlide}
                        style={styles.nextButton}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>

                {/* Slide 2 */}
                <View style={styles.slide}>
                    <Text style={styles.text}>Discover Amazing Features</Text>
                    <TouchableOpacity
                        onPress={goToNextSlide}
                        style={styles.nextButton}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>

                {/* Slide 3 - Final Slide */}
                <View style={styles.slide}>
                    <Text style={styles.text}>Get Started Now</Text>
                    <TouchableOpacity
                        onPress={completeOnboarding}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white' }}>Get Started</Text>
                    </TouchableOpacity>
                </View>
                
            </Swiper>
        </SafeAreaView>
    );
};

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: '#34D399',
        padding: 10,
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
};

export default Onboarding;
