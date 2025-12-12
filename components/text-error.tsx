import { useAppTheme } from '@/providers/app-theme-provider';
import { Text } from 'react-native';

export function TextError({ children }: { children: string }) {
  const theme = useAppTheme();

  return <Text style={{ color: theme.colors.text.danger }}>{children}</Text>;
}
