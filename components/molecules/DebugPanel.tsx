import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from '../atoms/Text';

type DebugPanelProps = {
  data: Record<string, string | number | boolean>;
  style?: StyleProp<ViewStyle>;
};

export function DebugPanel({ data, style }: DebugPanelProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="label" color="secondary" style={styles.title}>
        Debug Info
      </Text>
      
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text variant="caption" color="secondary">
            {key}:
          </Text>
          <Text variant="caption" color="accent" style={styles.value}>
            {String(value)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
  },
  title: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  value: {
    fontFamily: 'monospace',
  },
});