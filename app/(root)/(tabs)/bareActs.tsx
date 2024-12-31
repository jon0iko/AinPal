import { View, TextInput, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';

export default function BareActsScreen() {
  const [acts] = useState([
    { id: '1', title: 'The Penal Code' },
    { id: '2', title: 'The Dowry Prohibition Act 1980:' }
    
  ]);
  const [search, setSearch] = useState('');

  const filteredActs = acts.filter(act =>
    act.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search Bare Acts" 
        onChangeText={setSearch}
      />
      <FlatList 
        data={filteredActs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBar: { backgroundColor: '#ecf0f1', padding: 10, borderRadius: 8, marginBottom: 20 },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
