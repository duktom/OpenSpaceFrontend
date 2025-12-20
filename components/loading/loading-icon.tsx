import { ComponentProps } from 'react';
import { ActivityIndicator } from 'react-native-paper';

type LoadingIconProps = ComponentProps<typeof ActivityIndicator>;

export function LoadingIcon(props: LoadingIconProps) {
  return <ActivityIndicator {...props} />;
}
