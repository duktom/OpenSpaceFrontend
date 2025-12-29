import { useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';

export type OverlayProps = Omit<ComponentProps<typeof View>, 'children'> & {
  portalProps?: ComponentProps<typeof Portal>;
  visible?: boolean;
  dimBackground?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
};

export function Overlay({
  portalProps,
  visible = true,
  dimBackground = true,
  backgroundColor,
  style,
  children,
  ...restProps
}: OverlayProps) {
  const theme = useAppTheme();

  if (!visible) return null;

  const defaultBackgroundColor =
    backgroundColor ??
    (dimBackground
      ? theme.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.5)'
        : 'rgba(255, 255, 255, 0.35)'
      : 'transparent');

  return (
    <Portal {...portalProps}>
      <View
        pointerEvents="auto"
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: defaultBackgroundColor,
          },
          style,
        ]}
        {...restProps}
      >
        {children}
      </View>
    </Portal>
  );
}
