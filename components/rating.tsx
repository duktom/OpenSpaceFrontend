import { ComponentProps } from 'react';
import { View } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

type RatingProps = ComponentProps<typeof View> & {
  rating: number;
  textProps?: Omit<TextProps<never>, 'children'>;
};

export function Rating({ rating, style, textProps, ...restProps }: RatingProps) {
  return (
    <View
      {...restProps}
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text {...textProps}>{rating}</Text>
      <Text>⭐</Text>
    </View>
  );
}
