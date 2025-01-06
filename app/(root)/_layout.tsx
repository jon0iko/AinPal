import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent ={CustomDrawerContent}>
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

        {/* Share App Screen */}
        <Drawer.Screen
          name="ShareApp"
          options={{
            drawerLabel: "Share app",
            headerTitle: "Share app",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="share-social-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
