export interface IconContainerProps {
  name: string;
  size?: number;
  color?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  backgroundColor?: string;
  showBorder?: boolean;
  onPress?: () => void;
  borderColor?: string;
}
