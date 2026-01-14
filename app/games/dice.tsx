import { View, Text, StyleSheet } from 'react-native';

export default function DiceGame() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dice Game Screen</Text>
      <Text style={styles.subtext}>Ready for Phase 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 16,
    color: '#a0a0a0',
    marginTop: 10,
  },
});