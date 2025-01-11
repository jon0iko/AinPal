import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import LawItem from "./LawItem";
import { fetchLaws } from "../api/laws";

interface Law {
  id: string;
  title: string;
  date: string;
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
    const fetchedLaws = await fetchLaws(search, page); // API call
    setLaws((prevLaws) => [...prevLaws, ...fetchedLaws]);
    setLoading(false);
  };

  useEffect(() => {
    loadLaws();
  }, [page, search]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <FlatList
      data={laws}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <LawItem law={item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};

export default LawList;
