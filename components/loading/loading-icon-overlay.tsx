import { ComponentProps } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Overlay } from '../overlay';

type LoadingIconOverlayProps = Omit<ComponentProps<typeof Overlay>, 'children'> & {
  visible?: boolean;
  indicatorProps?: ComponentProps<typeof ActivityIndicator>;
};

export function LoadingIconOverlay({
  visible,
  indicatorProps,
  ...restProps
}: LoadingIconOverlayProps) {
  return (
    <Overlay visible={visible} {...restProps}>
      <ActivityIndicator size="large" {...indicatorProps} />
    </Overlay>
  );
}
