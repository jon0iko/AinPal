import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Image, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  const user = { isLoggedIn: true, name: "User" }; // Define the user object
  const route = useRouter();
  const url = "https://github.com/jon0iko/AinPal";

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Bug Ninza: " + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <LinearGradient colors={["#5363df", "#21256e"]} style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={require("../assets/images/user.png")}
            style={{ width: 100, height: 100, alignSelf: "center" }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 10,
              color: "#ffffff",
            }}
          >
            {/* Display user's email if logged in, otherwise "User" */}
            {user.isLoggedIn ? user.name : "User"}
          </Text>
        </View>

        {/* Drawer Items */}
        <View style={{ padding: 10 }}>
          <DrawerItemList {...props} />

          {/* Share App Button */}
          <DrawerItem
            label="Share App"
            icon={() => (
              <Ionicons name="share-social" size={20} color="white" />
            )}
            onPress={onShare}
            labelStyle={{ color: "#ffffff" }}
          />
        </View>

        {/* Logout Button */}
        <View style={{ padding: 10 }}>
          <DrawerItem
            label="Logout"
            onPress={() => route.replace("/")}
            labelStyle={{ color: "#ffffff" }}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#ffffff",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      ></View>
    </LinearGradient>
  );
}
