import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import TriviaCard from "../../../components/TriviaCard";
import RecentlyViewedActs from "@/components/RecentlyViewedActs";
import { useUser } from "@clerk/clerk-expo";
import { useBookmark } from "@/context/BookmarkContext"; // Import the BookmarkContext
import { useState } from "react";

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useUser();
  const { bookmarkCount } = useBookmark(); // Get the bookmark count from the context
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh action
    setTimeout(() => {
      setRefreshTrigger((prev) => prev + 1); // Increment refreshTrigger to force re-render
      setRefreshing(false);
    }, 1000); // Simulate 1-second network request
  };

  return (
    <ScrollView
      className="flex-1 bg-[#EBF2FA]"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } // Attach RefreshControl here
    >
      {/* Blue Section */}
      <View className="py-6 bg-[#1A4B8C] items-center">
        <View className="flex-row justify-between mt-4 w-full px-4">
          <TouchableOpacity
            className="items-center p-5 bg-[#FFFFFF] rounded-xl w-[31%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("bareActs")}
          >
            <Text className="text-3xl font-bold text-[#1A4B8C]">1454</Text>
            <Text className="text-sm text-[#2E5C99] text-center">
              Acts, Regulations & Ordinances
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center p-5 bg-[#FFFFFF] rounded-xl w-[31%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("constitution")}
          >
            <Image
              source={require("../../../assets/images/constitution.png")}
              className="w-11 h-11 mb-2"
            />
            <Text className="text-sm text-[#2E5C99] text-center">
              Constitution
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center p-5 bg-[#FFFFFF] rounded-xl w-[31%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("bookmarks")}
          >
            <Text className="text-3xl font-bold text-[#1A4B8C]">
              {bookmarkCount} {/* Dynamically display bookmark count */}
            </Text>
            <Text className="text-sm text-[#2E5C99] text-center">
              Bookmarks
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trivia Card Section */}
      <TriviaCard refreshTrigger={refreshTrigger} />

      {/* Recently Viewed Section */}
      <RecentlyViewedActs />
    </ScrollView>
  );
}
