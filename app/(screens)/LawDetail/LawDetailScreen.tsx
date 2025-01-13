import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SectionsTab from "./(tabs)/SectionsTab";
import LawInformationTab from "./(tabs)/LawInformationTab";
import { Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

const Tab = createMaterialTopTabNavigator();

const LawDetailScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const law_id = searchParams.get('law_id');
  const title = searchParams.get('title');
  const hasChapters = searchParams.get('hasChapters');

  return (
    <>
      <Stack.Screen
        options={{
          title: title! || "Law Details",
          headerStyle: { backgroundColor: "#1A4B8C" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#1A4B8C" },
          tabBarActiveTintColor: "#fff",
          tabBarIndicatorStyle: { backgroundColor: "#FFC107", height: 4 },
        }}
      >
        <Tab.Screen name="Sections">
          {() => <SectionsTab lawId={law_id} hasChapter={hasChapters} />}
        </Tab.Screen>
        <Tab.Screen name="Law Information">
          {() => <LawInformationTab lawId={law_id} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default LawDetailScreen;
