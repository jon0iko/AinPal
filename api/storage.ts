import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_LAWS_KEY = "recentlyViewedLaws";

export const getRecentlyViewedLaws = async () => {
  try {
    const data = await AsyncStorage.getItem(RECENT_LAWS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error fetching recently viewed laws:", error);
    return [];
  }
};
