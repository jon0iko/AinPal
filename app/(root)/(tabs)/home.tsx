import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Image } from 'react-native';

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.homeText}>Home</Text>
        
        {/* Row for Horizontal Buttons */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statBox} 
            onPress={() => navigation.navigate('bareActs')}
          >
            <Text style={styles.statNumber}>1454</Text>
            <Text style={styles.statLabel}>Bare Acts</Text>
          </TouchableOpacity>

          {/* TouchableOpacity for Constitution */}
          <TouchableOpacity 
            style={styles.statBox} 
            onPress={() => navigation.navigate('constitution')}
          >
            <Image 
              source={require('../../../assets/images/constitution.png')} 
              style={styles.icon} 
            />
            <Text style={styles.statLabel}>Constitution</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statBox} 
            onPress={() => navigation.navigate('bookmarks')}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Bookmarks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  header: { 
    padding: 20, 
    backgroundColor: '#34495e', 
    alignItems: 'center' 
  },
  homeText: { 
    fontSize: 24, 
    color: '#fff', 
    marginBottom: 24 
  },
  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',  // Space between buttons
    marginTop: 10,
    width: '100%'
  },
  statBox: { 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10,
    width: '30%',  // Each button takes 30% of width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  statNumber: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2c3e50' 
  },
  statLabel: { 
    fontSize: 14, 
    color: '#7f8c8d',
    textAlign: 'center' 
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8
  }
});
