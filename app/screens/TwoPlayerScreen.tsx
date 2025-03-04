import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GameBoard from '@/components/GameBoard';
import CustomHeader from '../components/CustomHeader';

const TwoPlayerScreen = () => {
  const navigation = useNavigation();

  const handleReset = () => {
    // Any additional logic on reset can be added here
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Two Player" />
      <Text style={styles.title}>Two Player Mode</Text>
      
      <View style={styles.gameBoardContainer}>
        <GameBoard onReset={handleReset} isSinglePlayer={false} />
      </View>

      {/* Floating Home Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Arial',
  },
  gameBoardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3b82f6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default TwoPlayerScreen;
