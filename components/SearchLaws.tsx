import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface SearchLawsProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchLaws: React.FC<SearchLawsProps> = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState(search);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleSearchChange = (text: string) => {
    setInputValue(text); // Update local state but don't update `setSearch` yet
  };

  const handleSearchSubmit = () => {
    setSearch(inputValue.trim()); // Update search only when user submits
    Keyboard.dismiss(); // Dismiss keyboard after submitting
  };

  // Generate years from current year to 1836
  const years = Array.from(
    { length: new Date().getFullYear() - 1835 },
    (_, i) => `${1836 + i}`
  ).reverse();

  const applyFilter = (year: string) => {
    setSelectedYear(year);
    setFilterVisible(false);
    setSearch(`${inputValue} ${year}`.trim()); // Update search with year
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#6C757D" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Acts"
          placeholderTextColor="#6C757D"
          value={inputValue}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit} // Updates `setSearch` only when user presses "Done"
          returnKeyType="search" // Makes keyboard show "Search" instead of "Done"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="options" size={20} color="#6C757D" />
        </TouchableOpacity>
      </View>

      <Modal visible={filterVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Year</Text>
            <FlatList
              data={years}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.yearItem}
                  onPress={() => applyFilter(item)}
                >
                  <Text style={styles.yearText}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#E8F0FE",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Jakarta",
    color: "#212529",
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "70%", // Constrain height
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "JakartaBold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  yearItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  yearText: {
    fontSize: 16,
    fontFamily: "JakartaMedium",
    color: "#212529",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#283BA6",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontFamily: "JakartaBold",
    fontSize: 16,
  },
});

export default SearchLaws;
