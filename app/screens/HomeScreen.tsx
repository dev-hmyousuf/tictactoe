import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

// Define your route names and their params
type RootStackParamList = {
  'Single Player': undefined;
  'Two Player': undefined;
};

// Define a type for the navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartPress = () => {
    setModalVisible(true);
  };

  const handleModeSelect = (mode: 'Single Player' | 'Two Player') => {
    setModalVisible(false);
    navigation.navigate(mode);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Tic Tac Toe" />
      <ImageBackground
        source={require('../../assets/images/homeBG.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <TouchableOpacity onPress={handleStartPress} style={styles.startButton}>
            <Image
              source={require('../../assets/images/St_btn.png')}
              style={styles.startButtonImage}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Game Mode</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.modeButton} onPress={() => handleModeSelect('Single Player')}>
                <Text style={styles.modeButtonText}>Single Player</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modeButton} onPress={() => handleModeSelect('Two Player')}>
                <Text style={styles.modeButtonText}>Two Player</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 200,
    alignItems: 'center',
  },
  startButtonImage: {
    width: 350,
    height: 120,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  modeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;