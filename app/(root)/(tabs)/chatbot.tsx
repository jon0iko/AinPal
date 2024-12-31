import { View, Text, StyleSheet } from 'react-native';

export default function chatbot() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to LawBot!</Text>
      <Text style={styles.subText}>Ask me to summarize or explain any law!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
