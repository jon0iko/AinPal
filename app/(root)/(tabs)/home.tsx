import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import TriviaCard from "../../../components/TriviaCard";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user } = useUser();
  return (
    <ScrollView className="flex-1 bg-[#EBF2FA]">
      {/* Blue Section */}
      <View className="p-5 bg-[#1A4B8C] items-center">
        <View className="flex-row justify-between mt-2 w-full">
          <TouchableOpacity
            className="items-center p-4 bg-[#FFFFFF] rounded-xl w-[30%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("bareActs")}
          >
            <Text className="text-3xl font-bold text-[#1A4B8C]">1454</Text>
            <Text className="text-sm text-[#2E5C99] text-center">
              Acts, Regulations & Ordinances
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center p-4 bg-[#FFFFFF] rounded-xl w-[30%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("constitution")}
          >
            <Image
              source={require("../../../assets/images/constitution.png")}
              className="w-10 h-10 mb-2"
            />
            <Text className="text-sm text-[#2E5C99] text-center">
              Constitution
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center p-4 bg-[#FFFFFF] rounded-xl w-[30%] shadow-lg border border-[#E3F2FD]"
            onPress={() => navigation.navigate("bookmarks")}
          >
            <Text className="text-3xl font-bold text-[#1A4B8C]">0</Text>
            <Text className="text-sm text-[#2E5C99] text-center">
              Bookmarks
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>

      {/* Trivia Card Section */}
      <TriviaCard />
    </ScrollView>
  );
}
