import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import SearchLaws from '@/components/SearchLaws';
import LawList from '@/components/LawList';

export default function BareActsScreen() {
  const [acts] = useState([
    { id: '1', title: 'The Penal Code' },
    { id: '2', title: 'The Dowry Prohibition Act 1980:' }
    
  ]);
  
  const [search, setSearch] = useState("");

  const filteredActs = acts.filter(act =>
    act.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* SearchLaws component has the prop search from child */}
      <SearchLaws search={search} setSearch={setSearch} />
      <LawList search={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
