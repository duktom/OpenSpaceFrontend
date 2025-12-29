import { ComponentProps, ReactNode } from 'react';
import { View } from 'react-native';

type CenteredProps = ComponentProps<typeof View> & {
  horizontal?: boolean;
  vertical?: boolean;
  children: ReactNode;
};

export function Centered({
  horizontal = true,
  vertical = true,
  style,
  children,
  ...rest
}: CenteredProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: vertical ? 'center' : 'flex-start',
          alignItems: horizontal ? 'center' : 'flex-start',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
