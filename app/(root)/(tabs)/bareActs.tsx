import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import SearchLaws from '@/components/SearchLaws';
import LawList from '@/components/LawList';

export default function BareActsScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <SearchLaws search={search} setSearch={setSearch} />
      <LawList search={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
