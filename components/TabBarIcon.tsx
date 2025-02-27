import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface TabBarIconProps {
  icon: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ icon, focused }) => (
  <View style={styles.container}>
    <SvgXml
      xml={icon}
      width={focused ? 32 : 28}
      height={focused ? 32 : 28}
      color={focused ? "#3b82f6" : "#64748b"}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBarIcon; 