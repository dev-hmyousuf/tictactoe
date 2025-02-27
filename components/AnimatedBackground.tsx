import React from 'react';
import { View, StyleSheet } from 'react-native';
import Particles from 'react-native-particles';

const AnimatedBackground = () => (
  <View style={styles.container}>
    <Particles
      numberOfParticles={200}
      particleColor={['#ff6b6b55', '#4dabf755', '#3b82f655']}
      particleSize={8}
      particleSpeed={0.6}
      particleLife={4000}
      emissionRate={12}
      direction="top"
      spread={60}
      gravity={0.05}
      minSize={6}
      maxSize={14}
      blendMode="lighten"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default AnimatedBackground; 