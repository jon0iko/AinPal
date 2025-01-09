import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useRouter } from "expo-router";
import { View,Text,Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
    const { top,bottom } = useSafeAreaInsets();
    const route = useRouter();
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
            {" "}
            Yuki Bhuiyan
          </Text>
        </View>
        <View style={{ background: "#fff", padding: 10 }}>
          <DrawerItemList {...props} />
          <DrawerItem label={"Logout"} onPress={() => route.replace("/")} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        
      </View>
    </View>
  );
}
