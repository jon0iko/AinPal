import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBookmark } from "@/context/BookmarkContext";

interface LawItemProps {
  law: {
    id: string;
    title: string;
    hasChapters: string;
  };
}

const LawItem: React.FC<LawItemProps> = ({ law }) => {
  const router = useRouter();
  const { toggleBookmark, isBookmarked } = useBookmark();

  const handlePress = () => {
    router.push({
      pathname: "/(screens)/LawDetail/LawDetailScreen",
      params: {
        law_id: law.id,
        title: law.title,
        hasChapters: law.hasChapters,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <Text style={styles.title}>{law.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleBookmark(law)}>
        <Ionicons
          name={isBookmarked(law.id) ? "bookmark" : "bookmark-outline"}
          size={24}
          color={isBookmarked(law.id) ? "#FFC107" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    paddingVertical: 20,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#121212",
  },
});

export default LawItem;
