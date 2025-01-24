import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Use expo-router's navigation
import { getRecentlyViewedLaws } from "@/api/storage";
import { useFocusEffect } from "@react-navigation/native";

interface law {
    id: string;
    title: string;
    hasChapters: string;
}

const RecentlyViewed: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [recentLaws, setRecentLaws] = useState([]);

  // Fetch recent laws when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      async function fetchRecentLaws() {
        const laws = await getRecentlyViewedLaws();
        setRecentLaws(laws);
      }
      fetchRecentLaws();
    }, [])
  );

  return (
    <View className="mt-4 px-4">
      <Text className="text-lg font-semibold text-[#1A4B8C]">
        Recently Viewed
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-2"
      >
        {recentLaws.map((law: law) => (
          <TouchableOpacity
            key={law.id}
            className="bg-white rounded-lg shadow-md mr-4 p-4 w-48"
            onPress={() =>
              router.push({
                pathname: "/(screens)/LawDetail/LawDetailScreen",
                params: {
                  law_id: law.id,
                  title: law.title,
                  hasChapters: law.hasChapters,
                },
              })
            }
          >
            <Text className="text-sm font-medium text-[#1A4B8C]">
              {law.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewed;
