import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useBookmark } from "@/context/BookmarkContext";

const BookmarksScreen: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmark();
  const router = useRouter();

  const renderItem = ({
    item,
  }: {
    item: { id: string; title: string; hasChapters: string };
  }) => (
    <View style={styles.bookmarkItem}>
      <TouchableOpacity
        style={styles.bookmarkText}
        onPress={() =>
          router.push({
            pathname: "/(screens)/LawDetail/LawDetailScreen",
            params: { law_id: item.id, title: item.title },
          })
        }
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleBookmark(item)}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarked Laws</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookmarks found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF2FA",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A4B8C",
    marginBottom: 20,
  },
  bookmarkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookmarkText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#121212",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginTop: 20,
  },
});

export default BookmarksScreen;
