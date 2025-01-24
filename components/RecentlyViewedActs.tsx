import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getRecentlyViewedLaws } from "@/api/storage";
import { useFocusEffect } from "@react-navigation/native";

interface Law {
  id: string;
  title: string;
  hasChapters: string;
}

const RecentlyViewed: React.FC = () => {
  const router = useRouter();
  const [recentLaws, setRecentLaws] = useState<Law[]>([]);

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
    <View style={styles.container}>
      <Text style={styles.title}>Recently Viewed</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {recentLaws.map((law) => (
          <TouchableOpacity
            key={law.id}
            style={styles.card}
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
            <Text style={styles.cardText}>{law.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30, // Increased spacing from the previous component
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A4B8C",
    marginBottom: 14, // Spacing between the title and the scrollable list
  },
  scrollContainer: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#FFF9C4", // Light yellow background
    borderRadius: 12, // Slightly rounded corners
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Elevation for Android shadow
    marginRight: 12, // Spacing between cards
    paddingVertical: 16, // Equal padding vertically
    paddingHorizontal: 12, // Padding inside the card
    width: 220, // Consistent card width
    borderWidth: 2, // Remove border for a clean edge
    borderColor: "#FFF54F",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A4B8C",
  },
});


export default RecentlyViewed;
