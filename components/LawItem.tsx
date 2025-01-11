import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface LawItemProps {
  law: {
    id: string;
    title: string;
    date: string;
  };
}

const LawItem: React.FC<LawItemProps> = ({ law }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate("lawDetail", { lawId: law.id });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Text style={styles.title}>{law.title}</Text>
      <Text style={styles.date}>{law.date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  title: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "#666" },
});

export default LawItem;
