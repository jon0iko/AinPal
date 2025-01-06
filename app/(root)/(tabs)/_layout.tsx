import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { router } from "expo-router";

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? "#007AFF" : "#7f8c8d"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="constitution"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="book-outline"
                size={24}
                color={focused ? "#007AFF" : "#7f8c8d"}
              />
            ),
          }}
        />

        {/* Floating Chatbot Button */}
        <Tabs.Screen
          name="chatbot"
          options={{
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.chatbotButton}
                onPress={() => router.push("/chatbot")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={26}
                  color="#fff"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="bareActs"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="document-text-outline"
                size={24}
                color={focused ? "#007AFF" : "#7f8c8d"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmarks"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={focused ? "#007AFF" : "#7f8c8d"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  chatbotButton: {
    position: "absolute",
    top: -20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
