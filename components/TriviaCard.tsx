import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TriviaCard = () => {
  return (
    <View style={styles.container}>
      {/* First Card - Vertical */}
      <LinearGradient
        colors={["#C9CCFF", "#7A89FF"]}
        style={styles.cardContainer}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="bulb-outline" size={40} color="#1A4B8C" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Did You Know?</Text>
          <Text style={styles.info}>
            The Bangladesh Labour Act, 2006 guarantees maternity leave of 16
            weeks (8 weeks before and 8 weeks after delivery) for working women.
          </Text>
        </View>
      </LinearGradient>

      {/* Scrollable Row of Three Cards - Horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scrollbar
        contentContainerStyle={styles.rowContainer}
      >
        {/* Second Card */}
        <LinearGradient
          colors={["#FFFFC2", "#C2B280"]}
          style={styles.cardContainerRectangle}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="copy-outline" size={40} color="#1A4B8C" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>The code of Civil Procedure</Text>
            <Text style={styles.info}>
              The National Flag of Bangladesh consists of a red circle in the
              center of a green field.
            </Text>
          </View>
        </LinearGradient>

        {/* Third Card */}
        <LinearGradient
          colors={["#FFFFC2", "#C2B280"]}
          style={styles.cardContainerRectangle}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="copy-outline" size={40} color="#1A4B8C" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>The Muslim Women(Protection of rights on marriage)</Text>
            <Text style={styles.info}>
              The Royal Bengal Tiger is the national animal of Bangladesh.
            </Text>
          </View>
        </LinearGradient>

        {/* Fourth Card (Rectangle Shape) */}
        <LinearGradient
          colors={["#FFFFC2", "#C2B280"]}
          style={styles.cardContainerRectangle}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="copy-outline" size={40} color="#1A4B8C" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>The Central Educational..</Text>
            <Text style={styles.info}>
              The Sundarbans is the largest mangrove forest in the world and a
              UNESCO World Heritage site.
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    marginRight: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: 250,
  },
  cardContainerRectangle: {
    marginRight: 40,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginTop: 100,
    elevation: 4,
    width: 400, // Make the width larger to look more rectangular
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A4B8C", // Specified blue color
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#343A30", // Neutral-500
    lineHeight: 20,
  },
 
});

export default TriviaCard;
