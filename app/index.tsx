import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Magic Dice</Text>
      <Text style={styles.subtitle}>Shake to Roll</Text>
      
      <Pressable 
        style={styles.button}
        onPress={() => router.push('/games/dice')}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => router.push('/test-dice')}
      >
        <Text style={styles.buttonText}>🔧 Calibrar Dado</Text>
      </Pressable>
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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
  },
  buttonSecondary: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#6c5ce7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
