import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveBackgroundColor: "#5363df", // Background color for active item
          drawerActiveTintColor: "#fff", // White text for active item
          drawerInactiveTintColor: "#fff", // White text for inactive items
          drawerHideStatusBarOnOpen: true,
          drawerLabelStyle: {
            marginLeft: -8, // Adjust to control text position
            fontSize: 14, // Optional: Adjust text size
          },
          drawerItemStyle: {
            marginVertical: 5, // Add space between items
          },
        }}
      >
        {/* Home Screen */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerTitle: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Profile Screen */}
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: "Profile",
            headerTitle: "My Profile",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Sign-Up Screen */}
        <Drawer.Screen
          name="signUp"
          options={{
            drawerLabel: "Sign-up",
            headerTitle: "Sign-up",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="create-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Settings Screen */}
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: "Settings",
            headerTitle: "Settings",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Contact Us Screen */}
        <Drawer.Screen
          name="ContactUs"
          options={{
            drawerLabel: "Contact Us",
            headerTitle: "Contact Us",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="mail-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
