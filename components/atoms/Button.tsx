import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  
  // Variants
  primary: {
    backgroundColor: '#6c5ce7',
  },
  secondary: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#6c5ce7',
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  small: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 100,
  },
  medium: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    minWidth: 200,
  },
  large: {
    paddingHorizontal: 60,
    paddingVertical: 20,
    minWidth: 250,
  },

  // States
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});