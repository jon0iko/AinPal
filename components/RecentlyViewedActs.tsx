import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

interface RecentTab {
  id: string;
  title: string;
  subtitle: string;
}

interface SideScrollViewProps {
  tabs: RecentTab[];
  onTabPress: (id: string) => void;
}

const RecentlyViewedActs: React.FC<SideScrollViewProps> = ({ tabs, onTabPress }) => {
  return (
    <View className="mt-4 px-4">
      <Text className="text-lg font-semibold text-[#1A4B8C]">Recently Viewed</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-2"
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            className="bg-white rounded-lg shadow-md mr-4 p-4 w-48"
            onPress={() => onTabPress(tab.id)}
          >
            <Text className="text-sm font-medium text-[#1A4B8C]">{tab.title}</Text>
            <Text className="text-xs text-gray-600 mt-1">{tab.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewedActs;
