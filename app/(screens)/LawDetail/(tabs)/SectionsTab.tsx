import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchSections } from "@/api/lawDetails";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Ensure this is installed

interface Section {
  section_key: string;
  section_number: string;
  headline: string;
  chapter_number?: string;
  chapter_title?: string;
}

interface GroupedSections {
  [key: string]: {
    chapter_title: string;
    sections: Section[];
  };
}

interface SectionsTabProps {
  lawId: any;
  hasChapter: any;
}

const SectionsTab: React.FC<SectionsTabProps> = ({ lawId, hasChapter }) => {
  const [groupedSections, setGroupedSections] = useState<GroupedSections>({});
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSections = async () => {
      const data = await fetchSections(lawId);
      setGroupedSections(data.groupedSections || {});
    };

    getSections();
  }, [lawId]);

  const filteredGroupedSections = Object.entries(groupedSections).reduce(
    (acc: GroupedSections, [chapterKey, chapterData]) => {
      const filteredSections = chapterData.sections.filter((section) =>
        section.headline.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredSections.length > 0) {
        acc[chapterKey] = {
          ...chapterData,
          sections: filteredSections,
        };
      }
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      {/* Styled Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#6C757D" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search sections"
          placeholderTextColor="#6C757D"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Sections List */}
      <FlatList
        data={Object.entries(filteredGroupedSections)}
        keyExtractor={([chapterKey]) => chapterKey}
        renderItem={({ item: [chapterKey, chapterData] }) => (
          <View style={styles.chapterContainer}>
            {hasChapter && chapterKey !== "No Chapter" && (
              <Text style={styles.chapterTitle}>
                {chapterKey}: {chapterData.chapter_title}
              </Text>
            )}
            <FlatList
              data={chapterData.sections}
              keyExtractor={(section) => section.section_key}
              renderItem={({ item: section }) => (
                <TouchableOpacity
                  style={styles.sectionItem}
                  onPress={() => {
                    router.push({
                      pathname: "/(screens)/SectionText",
                      params: { sectionKey: section.section_key, lawId: lawId },
                    });
                  }}
                >
                  <Text style={styles.sectionNumber}>
                    Section {section.section_number}.
                  </Text>
                  <Text style={styles.sectionHeadline}>
                    {section.headline}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EBF2FA", // Background for the page
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A7C7E7", // Matching the color scheme of "Search laws"
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Jakarta", // Using Jakarta font
    color: "#212529", // Text color
  },
  icon: {
    marginRight: 10,
  },
  chapterContainer: {
    marginBottom: 20,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeadline: {
    fontSize: 14,
    color: "#555",
  },
});

export default SectionsTab;
