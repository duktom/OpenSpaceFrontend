import { useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type SkeletonProps = ComponentProps<typeof View> & {
  width?: ViewStyle['width'];
  height: ViewStyle['height'];
  borderRadius?: number;
};

export function Skeleton({
  width = '100%',
  height,
  borderRadius = 6,
  style,
  ...restProps
}: SkeletonProps) {
  const theme = useAppTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor =
      theme.mode === 'dark'
        ? interpolateColor(progress.value, [0, 1], ['hsl(0, 0%, 17%)', 'hsl(0, 0%, 22%)'])
        : interpolateColor(progress.value, [0, 1], ['hsl(220, 20%, 91%)', 'hsl(220, 20%, 86%)']);

    return { backgroundColor };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
      {...restProps}
    />
  );
}
