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
        <Ionicons name="arrow-back" size={28} color="#003F7D"/>
      </TouchableOpacity>

      {/* Content */}
      <ScrollView style={styles.container}>
        <Text style={styles.sectionNumber}>
          Section {sectionDetails.section_number}
        </Text>
        <Text style={styles.headline}>{sectionDetails.headline}</Text>
        <Text style={styles.markdownText}>{sectionDetails.markdown_text}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
    textAlign: "center",
  },
  headline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0055AA",
    marginBottom: 24,
    textAlign: "center",
  },
  markdownText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
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
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 10,
  },
});

export default SectionText;
