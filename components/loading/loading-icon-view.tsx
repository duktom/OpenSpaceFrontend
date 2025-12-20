import { useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps } from 'react';
import { View } from 'react-native';
import { LoadingIcon } from './loading-icon';

type LoadingIconViewProps = ComponentProps<typeof View> & {
  loadingIconProps?: ComponentProps<typeof LoadingIcon>;
};

export function LoadingIconView({ style, loadingIconProps, ...restProps }: LoadingIconViewProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background.dark,
        },
        style,
      ]}
      {...restProps}
    >
      <LoadingIcon size="large" {...loadingIconProps} />
    </View>
  );
}
