import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

const lightTheme = {
  background: '#fff',
  text: '#000',
};

const darkTheme = {
  background: '#000',
  text: '#fff',
}; 