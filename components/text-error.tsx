import { useAppTheme } from '@/providers/app-theme-provider';
import { PropsWithChildren } from 'react';
import { Text } from 'react-native';

export function TextError({ children }: Required<PropsWithChildren>) {
  const theme = useAppTheme();

  return <Text style={{ color: theme.colors.text.danger }}>{children}</Text>;
}
