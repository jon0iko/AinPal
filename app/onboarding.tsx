import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { onboarding } from "@/contants";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    router.replace("/(root)/(tabs)/home"); // Navigate to home
  };

  const goToNextSlide = () => {
    swiperRef.current?.scrollBy(1);
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(root)/(tabs)/home")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-red text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]" />}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 justify-center items-center">
            {/* Lottie Animation */}
            <LottieView
              source={item.animation}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />

            {/* Title */}
            <Text className="text-2xl text-center font-semibold text-black mt-6">
              {item.title}
            </Text>

            {/* Description */}
            <Text className="text-lg text-center text-gray-700 mt-2 px-5">
              {item.description}
            </Text>

            {/* Next Button */}
            {activeIndex < onboarding.length - 1 ? (
              <TouchableOpacity
                onPress={goToNextSlide}
                className="mt-8 bg-green-400 p-3 rounded-md"
              >
                <Text className="text-white font-bold">Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={completeOnboarding}
                className="mt-8 bg-blue-600 p-3 rounded-md"
              >
                <Text className="text-white">Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;
