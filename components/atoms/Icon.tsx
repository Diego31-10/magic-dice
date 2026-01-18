import { ViewStyle, StyleProp } from 'react-native';
import * as LucideIcons from 'lucide-react-native';

type IconName = keyof typeof LucideIcons;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 24, color = '#ffffff', style }: IconProps) {
  const IconComponent = LucideIcons[name] as React.ComponentType<{
    size: number;
    color: string;
  }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
}