import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-5 bg-[#34495e] items-center">
        

        {/* Row for Horizontal Buttons */}
        <View className="flex-row justify-between mt-2 w-full">
          <TouchableOpacity
            className="items-center p-4 bg-white rounded-xl w-[30%] shadow-md"
            onPress={() => navigation.navigate("bareActs")}
          >
            <Text className="text-3xl font-bold text-[#2c3e50]">1454</Text>
            <Text className="text-sm text-[#7f8c8d] text-center">
              Bare Acts
            </Text>
          </TouchableOpacity>

          {/* TouchableOpacity for Constitution */}
          <TouchableOpacity
            className="items-center p-4 bg-white rounded-xl w-[30%] shadow-md"
            onPress={() => navigation.navigate("constitution")}
          >
            <Image
              source={require("../../../assets/images/constitution.png")}
              className="w-10 h-10 mb-2"
            />
            <Text className="text-sm text-[#7f8c8d] text-center">
              Constitution
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center p-4 bg-white rounded-xl w-[30%] shadow-md"
            onPress={() => navigation.navigate("bookmarks")}
          >
            <Text className="text-3xl font-bold text-[#2c3e50]">0</Text>
            <Text className="text-sm text-[#7f8c8d] text-center">
              Bookmarks
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
