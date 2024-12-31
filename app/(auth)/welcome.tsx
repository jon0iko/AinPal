import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to Onboarding!</Text>
      <TouchableOpacity
        onPress={() => router.push('/home')}
        style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: '#fff' }}>Skip to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
}
