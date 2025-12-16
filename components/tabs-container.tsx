import { useAppTheme } from '@/providers/app-theme-provider';
import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

export function TabsContainer({ style, children, ...restProps }: PropsWithChildren<ViewProps>) {
  const theme = useAppTheme();

  return (
    <View
      {...restProps}
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
          paddingLeft: '5%',
          paddingRight: '5%',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
