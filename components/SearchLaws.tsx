import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have installed @expo/vector-icons

interface SearchLawsProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchLaws: React.FC<SearchLawsProps> = ({ search, setSearch }) => {
  const handleSearchChange = (text: string) => {
    setSearch(text); // Allow the user to type spaces freely
  };

  const handleSearchBlur = () => {
    setSearch(search.trim()); // Trim leading and trailing spaces when the input loses focus
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#6C757D" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Acts"
          placeholderTextColor="#6C757D"
          value={search}
          onChangeText={handleSearchChange} // Update search term as user types
          onBlur={handleSearchBlur} // Trim spaces when the user finishes typing
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#6C757D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A7C7E7", // Use the neutral-200 color from your Tailwind config
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Jakarta", // Using the Jakarta font from your Tailwind config
    color: "#212529", // Use neutral-800 for text color
  },
  icon: {
    marginRight: 10,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default SearchLaws;
