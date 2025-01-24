import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SectionsTab from "./(tabs)/SectionsTab";
import LawInformationTab from "./(tabs)/LawInformationTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

const Tab = createMaterialTopTabNavigator();

const RECENT_LAWS_KEY = "recentlyViewedLaws";

const saveToRecentlyViewed = async (lawId: string, title: string, hasChapters: string) => {
  try {
    const existing = await AsyncStorage.getItem(RECENT_LAWS_KEY);
    const recentLaws = existing ? JSON.parse(existing) : [];
    const updatedLaws = [
      { id: lawId, title, hasChapters },
      ...recentLaws.filter((law: { id: string }) => law.id !== lawId),
    ].slice(0, 4); // Keep only the last 4 entries
    await AsyncStorage.setItem(RECENT_LAWS_KEY, JSON.stringify(updatedLaws));
  } catch (error) {
    console.error("Error saving to recently viewed:", error);
  }
};

const LawDetailScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const law_id = searchParams.get("law_id")!;
  const title = searchParams.get("title")!;
  const hasChapters = searchParams.get("hasChapters");

  useEffect(() => {
    // Save the law to recently viewed whenever the screen loads
    saveToRecentlyViewed(law_id, title, hasChapters!);
  }, [law_id, title, hasChapters]);

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Law Details",
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
