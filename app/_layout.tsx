import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Magic Dice',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="games/dice" 
        options={{ 
          title: 'Dice Game',
          headerShown: true,
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
}