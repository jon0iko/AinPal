import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
interface LawItemProps {
  law: {
    id: string;
    title: string;
    subtitle: string;
    publicationDate: string;
  };
}

const LawItem: React.FC<LawItemProps> = ({ law }) => {
  const router = useRouter();
  

  const handlePress = () => {
    // Navigate to the "lawDetail" screen with the law's ID as a parameter
    // navigation.navigate("lawDetail", { lawId: law.id });
    router.push("/(screens)/LawDetail/LawDetailScreen");
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Text style={styles.title}>{law.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#121212",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default LawItem;
