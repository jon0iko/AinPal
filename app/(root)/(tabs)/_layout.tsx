import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={focused ? "#007AFF" : "#7f8c8d"}
                />
                {focused && <View style={styles.dot} />}
              </View>
            ),
          }}
        />

        {/* Constitution Tab */}
        <Tabs.Screen
          name="constitution"
          options={{
            headerTitle:
              "The Constitution of Bangladesh",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="book-outline"
                  size={24}
                  color={focused ? "#007AFF" : "#7f8c8d"}
                />
                {focused && <View style={styles.dot} />}
              </View>
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

        {/* Bare Acts Tab */}
        <Tabs.Screen
          name="bareActs"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={focused ? "#007AFF" : "#7f8c8d"}
                />
                {focused && <View style={styles.dot} />}
              </View>
            ),
          }}
        />

        {/* Bookmarks Tab */}
        <Tabs.Screen
          name="bookmarks"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="bookmark-outline"
                  size={24}
                  color={focused ? "#007AFF" : "#7f8c8d"}
                />
                {focused && <View style={styles.dot} />}
              </View>
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
  iconContainer: {
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#007AFF",
    marginTop: 4,
  },
 chatbotButton: {
  position: "absolute",
  bottom: 20, // Adjust as needed to make it float above the tab bar
  left: "50%", // Center horizontally
  transform: [{ translateX: -30 }], // Shift left by half the button's width (e.g., 60px wide)
  backgroundColor: "#1A4B8C",
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
