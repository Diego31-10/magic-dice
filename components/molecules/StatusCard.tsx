import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import * as LucideIcons from 'lucide-react-native';

type StatusCardProps = {
  icon: keyof typeof LucideIcons;
  message: string;
  variant?: 'default' | 'active' | 'success';
  style?: StyleProp<ViewStyle>;
};

export function StatusCard({ 
  icon, 
  message, 
  variant = 'default',
  style 
}: StatusCardProps) {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <Icon name={icon} size={20} color="#ffffff" />
      <Text variant="body" style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
  },

  // Variants
  default: {
    backgroundColor: '#16213e',
    borderColor: '#2d3561',
  },
  active: {
    backgroundColor: '#6c5ce7',
    borderColor: '#a29bfe',
  },
  success: {
    backgroundColor: '#00b894',
    borderColor: '#55efc4',
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});