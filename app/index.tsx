import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/atoms/Button';
import { Text } from '../components/atoms/Text';
import { Icon } from '../components/atoms/Icon';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Icon name="Dices" size={80} color="#6c5ce7" style={styles.logo} />
      
      <Text variant="title" align="center">
        Magic Dice
      </Text>
      
      <Text variant="subtitle" color="secondary" align="center" style={styles.subtitle}>
        Shake to Roll
      </Text>
      
      <Button 
        onPress={() => router.push('/games/dice')}
        variant="primary"
        size="medium"
      >
        <Icon name="Play" size={20} color="#ffffff" />
        <Text variant="body" bold>Start Game</Text>
      </Button>

      <Button 
        onPress={() => router.push('/burger')}
        variant="primary"
        size="medium"
      >
        <Icon name="ChefHat" size={20} color="#ffffff" />
        <Text variant="body" bold>Burger Builder</Text>
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 15,
  },
  logo: {
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 20,
  },
  secondaryButton: {
    marginTop: 10,
  },
});