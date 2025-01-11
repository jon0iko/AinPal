import { View } from "react-native";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface SearchLawsProps {
  search: string;
  setSearch: (value: string) => void;
}

// send search state to parent component
const SearchLaws: React.FC<SearchLawsProps> = ({ search, setSearch }) => {
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Acts"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default SearchLaws;
