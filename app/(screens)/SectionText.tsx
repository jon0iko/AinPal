import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import Markdown from "react-native-markdown-display";
import {
  fetchSectionDetails,
  fetchFootnotes as fetchSectionFootnotes,
} from "../../api/sectionDetails";
import { fetchLawDisplayinfo } from "@/api/lawDetails";
import { useNavigation } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

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
    parent_law_id: number;
  } | null>(null);
  const [footnotes, setFootnotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSectionDetails = async () => {
      try {
        const data = await fetchSectionDetails(sectionKey);
        setSectionDetails(data);

        // Extract footnote numbers from text
        const footnoteMatches =
          data.markdown_text.match(/\{\{footnote:(\d+)\}\}/g) || [];
        const footnoteNumbers = footnoteMatches
          .map((match:any) => match.match(/\d+/)?.[0])
          .filter(Boolean);

        // convert footnote numbers to string
        footnoteNumbers.map((num:any) => num.toString());

        if (footnoteNumbers.length > 0) {
          const fetchedFootnotes = await fetchSectionFootnotes(
            data.parent_law_id,
            footnoteNumbers
          );
          const footnoteMap = fetchedFootnotes.reduce(
            (map: Record<string, string>, { number, text }: { number: string; text: string }) => {
              map[number] = text;
              return map;
            },
            {} as Record<string, string>
          );
          setFootnotes(footnoteMap);
        }
      } catch (error) {
        console.error("Error loading section details or footnotes:", error);
      } finally {
        setLoading(false);
      }
    };

    getSectionDetails();
  }, [sectionKey]);

  const renderMarkdown = (markdown: string) => {
    const processedMarkdown = markdown.replace(
      /\{\{footnote:(\d+)\}\}/g,
      (_, footnoteId) => `*[${footnoteId}]*` // Bracketed number syntax
    );

    const processedInterlinks = processedMarkdown.replace(
      /\[(.*?)\]\(\/law:\/\/(\d+)\)/g,
      (_, text, lawId) => `[${text}](law://${lawId})`
    );
  // console.log(processedInterlinks);
  
  return processedInterlinks;
  };

  const handleLinkPress = (url: string): boolean => {
    if (url.startsWith("law://")) {
      const lawId = url.replace("law://", "");

      fetchLawDisplayinfo(lawId)
        .then(({ title, hasChapters }) => {
          router.push({
            pathname: "/(screens)/LawDetail/LawDetailScreen",
            params: {
              law_id: lawId,
              title: title,
              hasChapters: hasChapters,
            },
          });
        })
        .catch((error) =>
          console.error("Error fetching law details for navigation:", error)
        );

      return true;
    } else {
      Linking.openURL(url).catch((err) =>
        console.error("Error opening external link:", err)
      );

      return true;
    }
  };

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
          colors={["#6f9ec9", "#003F7D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <Text style={styles.sectionNumber}>
            Section {sectionDetails.section_number}
          </Text>
          <Text style={styles.headline}>{sectionDetails.headline}</Text>
        </LinearGradient>

        {/* Render Markdown */}
        <Markdown
          style={{
            body: styles.body,
            heading1: styles.heading1,
            link: styles.link,
            bullet_list: styles.bullet_list,
            list_item: styles.list_item,
          }}
          onLinkPress={(url) => handleLinkPress(url)}
        >
          {renderMarkdown(sectionDetails.markdown_text)}
        </Markdown>

        {/* Footnotes */}
        {Object.keys(footnotes).length > 0 && (
          <View style={styles.footnotesContainer}>
            <Text style={styles.footnotesTitle}>Footnotes:</Text>
            {Object.entries(footnotes).map(([key, text]) => (
              <Text key={key} id={`footnote-${key}`} style={styles.footnote}>
                {`${key}. ${text}`}
              </Text>
            ))}
          </View>
        )}
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
    color: "#FFFFFF",
  },
  headline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 4,
  },
  body: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333333",
    textAlign: "justify",
    marginTop: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  link: {
    color: "#304FFE", // Link color
    textDecorationLine: "underline",
  },
  bullet_list: {
    marginVertical: 8,
  },
  list_item: {
    marginVertical: 4,
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
  footnotesContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingTop: 16,
  },
  footnotesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    color: "#003F7D", // Adjust color to match your theme
  },
  footnote: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  sup: {
    fontSize: 12, // Smaller font size for superscripts
    lineHeight: 18,
    verticalAlign: "top", // Align text to the top
  },
});

export default SectionText;
