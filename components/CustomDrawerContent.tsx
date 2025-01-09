import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Image, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#dde3fe" }}
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
              color: "#5363df",
            }}
          >
            Yuki Bhuiyan
          </Text>
        </View>

        {/* Drawer Items */}
        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          <DrawerItemList {...props} />

          {/* Share App Button */}
          <DrawerItem
            label="Share App"
            icon={() => (
              <Ionicons name="share-social" size={20} color="black" />
            )}
            onPress={onShare}
          />
        </View>

        {/* Logout Button */}
        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          <DrawerItem label="Logout" onPress={() => route.replace("/")} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      />
    </View>
  );
}
