import { useAppTheme } from '@/providers/app-theme-provider';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export function TabsContainer({ children }: PropsWithChildren) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        paddingLeft: '5%',
        paddingRight: '5%',
      }}
    >
      {children}
    </View>
  );
}
