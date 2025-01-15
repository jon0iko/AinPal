import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from "react-native";
import LawItem from "./LawItem";
import { fetchLaws } from "../api/laws";

interface Law {
  id: string;
  title: string;
  hasChapters: string;
}

interface LawListProps {
  search: string;
}

const LawList: React.FC<LawListProps> = ({ search }) => {
  const [laws, setLaws] = useState<Law[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadLaws = async () => {
    setLoading(true);
    try {
      const fetchedLaws = await fetchLaws(search, page); // API call
      const mappedLaws = fetchedLaws.map((law: any) => ({
        id: `${law.lawId.low}`, // Convert lawId to a usable string
        title: law.title,
        hasChapters: law.hasChapters.toString(),
      }));
       setLaws((prevLaws) => {
         // If it's a new search (first page), replace the list
         if (page === 1) {
           return mappedLaws;
         }
         // Otherwise, append new results and deduplicate
         const uniqueLaws = new Map(prevLaws.map((law) => [law.id, law])); // Add existing laws
         mappedLaws.forEach((law:any) => uniqueLaws.set(law.id, law)); // Add new laws
         return Array.from(uniqueLaws.values()); // Convert back to array
       });
    } catch (error) {
      console.error("Error loading laws:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch laws whenever the page or search changes
  useEffect(() => {
    setLaws([]); // Clear laws when search term changes
    setPage(1); // Reset to the first page
  }, [search]);

  useEffect(() => {
    loadLaws();
  }, [page, search]);

  const handleLoadMore = () => {
    if (!loading) setPage((prev) => prev + 1); // Increment page for infinite scroll       
  };

  return (
    <FlatList
      data={laws}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <LawItem law={item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      ListEmptyComponent={
        !loading ? <Text style={styles.emptyText}>No laws found</Text> : null
      }
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default LawList;
