import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              if (user) {
                await user.delete();
                Alert.alert(
                  "Profile Deleted",
                  "Your profile has been deleted."
                );
                router.replace("/onboarding");
              } else {
                Alert.alert("Error", "User not found.");
              }
            } catch (error) {
              console.error("Failed to delete profile:", error);
              Alert.alert(
                "Error",
                "Failed to delete the profile. Please try again."
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#a7c7e7", "#6a77cc"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>My Profile</Text>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  user?.externalAccounts[0]?.imageUrl ??
                  user?.imageUrl ??
                  "https://via.placeholder.com/110",
              }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.infoContainer}>
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Provided"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Provided"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Provided"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>

          <TouchableOpacity
            onPress={handleDeleteProfile}
            style={styles.deleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.deleteButtonText}>Delete</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
    color: "black",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
