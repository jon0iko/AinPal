import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchSectionDetails } from "../../api/sectionDetails";
import { useNavigation } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

interface SectionTextProps {
  route: {
    params: {
      sectionKey: string;
    };
  };
}

const SectionText: React.FC<SectionTextProps> = ({ route }) => {
  const searchParams = useSearchParams();
  const sectionKey = searchParams.get("sectionKey");
  const navigation = useNavigation();
  const [sectionDetails, setSectionDetails] = useState<{
    section_number: string;
    headline: string;
    markdown_text: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSectionDetails = async () => {
      try {
        const data = await fetchSectionDetails(sectionKey);
        setSectionDetails(data);
      } catch (error) {
        console.error("Error loading section details:", error);
      } finally {
        setLoading(false);
      }
    };

    getSectionDetails();
  }, [sectionKey]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!sectionDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load section details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#003F7D" />
      </TouchableOpacity>

      {/* Content */}
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={["#6f9ec9", "#003F7D"]} // Gradient colors (light to dark)
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <Text style={styles.sectionNumber}>
            Section {sectionDetails.section_number}
          </Text>
          <Text style={styles.headline}>{sectionDetails.headline}</Text>
        </LinearGradient>
        <Text style={styles.markdownText}>{sectionDetails.markdown_text}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#EBF2FA",
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 16,
  },
  headerContainer: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  sectionNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF", // White text for better contrast with gradient
  },
  headline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF", // White text for better contrast with gradient
    marginTop: 4,
  },
  markdownText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333333",
    textAlign: "justify",
    marginTop: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  backButton: {
    padding: 12,
    backgroundColor: "#F0F4F8",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default SectionText;
