import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="single-player" />
      <Stack.Screen name="two-player" />
    </Stack>
  );
}
