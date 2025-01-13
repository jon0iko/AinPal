import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchLawInfo } from "../../../../api/lawDetails"; // Adjust the relative path to match your structure

interface LawInformationTabProps {
  lawId: any;
}

interface LawDetails {
  title: string;
  subtitle: string;
  publicationDate: string;
  description: string;
}

const LawInformationTab: React.FC<LawInformationTabProps> = ({ lawId }) => {
  const [lawDetails, setLawDetails] = useState<LawDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchLawInfo(lawId); // Call the API function
        setLawDetails(data);
      } catch (error) {
        console.error("Error fetching law details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [lawId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1A4B8C" />
      </View>
    );
  }

  if (!lawDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load law details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Title:</Text>
      <Text style={styles.title}>{lawDetails.title}</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Act No:</Text>
          <Text style={styles.value}>{lawDetails.subtitle || "N/A"}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Publication:</Text>
          <Text style={styles.value}>
            {lawDetails.publicationDate || "N/A"}
          </Text>
        </View>
      </View>
        {lawDetails.description ? (
            <>
            <Text style={styles.sectionTitle}>Summary:</Text>
            <Text style={styles.summary}>{lawDetails.description}</Text>
            </>
        ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF2FA",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBF2FA",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A4B8C",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  column: {
    flex: 1,
    // marginHorizontal: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  summary: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default LawInformationTab;
