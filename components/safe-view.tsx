import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeViewProps = {
  withPaddingBottom: boolean;
} & PropsWithChildren<ViewProps>;

// In most cases we have Tabs on bottom of the screen so we don't need padding bottom
// but if u don't have it then u should use it
export function SafeView({ withPaddingBottom, children, style, ...restProps }: SafeViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...restProps}
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        withPaddingBottom && { paddingBottom: insets.bottom },
        style,
      ]}
    >
      {children}
    </View>
  );
}
