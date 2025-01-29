import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchConstitutionSections } from "@/api/lawDetails";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Ensure this is installed

interface Section {
  section_key: string;
  section_number: string;
  headline: string;
  chapter_number?: string;
  chapter_title?: string;
  part_number?: string;
  part_title?: string;
  id: number;
}

interface GroupedSections {
  [partKey: string]: {
    part_title: string;
    chapters: {
      [chapterKey: string]: {
        chapter_title: string;
        sections: Section[];
      };
    };
  };
}

const ConstitutionSections: React.FC = () => {
  const [groupedSections, setGroupedSections] = useState<GroupedSections>({});
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSections = async () => {
      const data = await fetchConstitutionSections();
      setGroupedSections(data.groupedSections || {});
    };

    getSections();
  }, []);

  const filteredGroupedSections = Object.entries(groupedSections).reduce(
    (acc: GroupedSections, [partKey, partData]) => {
      const filteredChapters = Object.entries(partData.chapters).reduce(
        (chapAcc, [chapterKey, chapterData]) => {
          const filteredSections = chapterData.sections.filter((section) =>
            section.headline.toLowerCase().includes(search.toLowerCase())
          );
          if (filteredSections.length > 0) {
            chapAcc[chapterKey] = {
              ...chapterData,
              sections: filteredSections,
            };
          }
          return chapAcc;
        },
        {} as GroupedSections[string]["chapters"]
      );

      if (Object.keys(filteredChapters).length > 0) {
        acc[partKey] = {
          ...partData,
          chapters: filteredChapters,
        };
      }

      return acc;
    },
    {} as GroupedSections
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
        keyExtractor={([partKey]) => partKey}
        renderItem={({ item: [partKey, partData] }) => (
          <View style={styles.partContainer}>
            <Text style={styles.partTitle}>
              {partKey}: {partData.part_title}
            </Text>
            <FlatList
              data={Object.entries(partData.chapters)}
              keyExtractor={([chapterKey]) => chapterKey}
              renderItem={({ item: [chapterKey, chapterData] }) => (
                <View style={styles.chapterContainer}>
                  {chapterKey !== "No Chapter" && (
                    <Text style={styles.chapterTitle}>
                      {chapterKey}: {chapterData.chapter_title}
                    </Text>
                  )}
                  <FlatList
                    data={chapterData.sections}
                    keyExtractor={(section) => section.id.toString()}
                    renderItem={({ item: section }) => (
                      <TouchableOpacity
                        style={styles.sectionItem}
                        onPress={() => {
                          router.push({
                            pathname: "/(screens)/SectionText",
                            params: {
                              sectionKey: section.section_key,
                              lawId: 367,
                            },
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
  partContainer: {
    marginBottom: 20,
  },
  partTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#304FFE",
    marginBottom: 8,
  },
  chapterContainer: {
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#576CFF",
    marginBottom: 6,
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

export default ConstitutionSections;
