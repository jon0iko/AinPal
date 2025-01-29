import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchSections } from "@/api/lawDetails";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConSectionsTab from "./Consections/ConSectionsTab";


const router = useRouter();
const Tab = createMaterialTopTabNavigator();

export default function ConstitutionScreen() {
  const navigation = useNavigation();
  const law_id = 11;
  const hasChapters = true;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/home")}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#34495e"
            style={styles.backlogo}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>The Constitution of Bangladesh</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#1A4B8C" },
          tabBarActiveTintColor: "#fff",
          tabBarIndicatorStyle: { backgroundColor: "#FFC107", height: 4 },
        }}
      >
        <Tab.Screen name="Sections">
          {() => <ConSectionsTab lawId={law_id} hasChapter={hasChapters} />}
        </Tab.Screen>
        <Tab.Screen name="Law Information">
          {() => <LawInformationTab lawId={law_id} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF2FA", // Background for the page
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A4B8C", // Updated background color
    padding: 16,
    position: "relative",
  },
  backButton: {
    marginRight: 16,
  },
  backlogo: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  searchInput: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeadline: {
    fontSize: 14,
    color: "#555",
  },
});