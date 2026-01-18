import { Text as RNText, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';
type TextColor = 'primary' | 'secondary' | 'accent' | 'error';

type CustomTextProps = {
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  style?: StyleProp<TextStyle>;
};

export function Text({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  bold = false,
  style,
}: CustomTextProps) {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        styles[color],
        { textAlign: align },
        bold && styles.bold,
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },

  // Variants
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Colors
  primary: {
    color: '#ffffff',
  },
  secondary: {
    color: '#a0a0a0',
  },
  accent: {
    color: '#6c5ce7',
  },
  error: {
    color: '#ff6b6b',
  },

  // States
  bold: {
    fontWeight: 'bold',
  },
});