import { useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps } from 'react';
import { Text } from 'react-native-paper';

type TextErrorProps = ComponentProps<typeof Text> & {
  children: string | number;
};

export function TextError({ style, children, ...restProps }: TextErrorProps) {
  const theme = useAppTheme();

  return (
    <Text style={[style, { color: theme.colors.text.danger }]} {...restProps}>
      {children}
    </Text>
  );
}
