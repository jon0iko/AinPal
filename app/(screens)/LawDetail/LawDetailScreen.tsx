import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SectionsTab from "./SectionsTab";
import LawInformationTab from "./LawInformationTab";
import { StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

const LawDetailScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#004D73" },
        tabBarActiveTintColor: "#fff",
        tabBarIndicatorStyle: { backgroundColor: "#FFC107", height: 4 },
      }}
    >
      <Tab.Screen name="Sections" component={SectionsTab} />
      <Tab.Screen name="Law Information" component={LawInformationTab} />
    </Tab.Navigator>
  );
};

export default LawDetailScreen;
