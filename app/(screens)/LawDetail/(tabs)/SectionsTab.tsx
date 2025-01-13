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
      <TextInput
        style={styles.searchBar}
        placeholder="Search sections"
        value={search}
        onChangeText={setSearch}
      />
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
                    params: { sectionKey: section.section_key },
                    })
                    }
                  }
                >
                  <Text style={styles.sectionNumber}>
                    Section {section.section_number}.
                  </Text>
                  <Text style={styles.sectionHeadline}>{section.headline}</Text>
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
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
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
