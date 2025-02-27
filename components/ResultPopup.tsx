import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ResultPopupProps {
  visible: boolean;
  result: 'win' | 'draw' | null;
  winner?: string;
  onPlayAgain: () => void;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ 
  visible, 
  result, 
  winner, 
  onPlayAgain, 
  onClose 
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>
          {result === 'draw' ? 'DRAW!' : `${winner} Wins!`}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.playButton} onPress={onPlayAgain}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  playButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#64748b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ResultPopup; 