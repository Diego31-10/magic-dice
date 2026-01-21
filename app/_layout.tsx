import { Stack } from 'expo-router';
import { BurgerProvider } from '../context/BurgerContext';

export default function RootLayout() {
  return (
    <BurgerProvider>
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
        <Stack.Screen 
          name="burger/index" 
          options={{ 
            title: 'Burger Builder',
            headerShown: true,
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="test-dice" 
          options={{ 
            title: 'Dice Calibrator',
            headerShown: true,
            headerBackTitle: 'Back'
          }} 
        />
      </Stack>
    </BurgerProvider>
  );
}