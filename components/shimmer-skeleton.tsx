import { useAppTheme } from '@/providers/app-theme-provider';
import { LinearGradient } from 'expo-linear-gradient';
import { ComponentProps, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Skeleton } from './skeleton';

type ShimmerSkeletonProps = Omit<ComponentProps<typeof Skeleton>, 'children'>;

const SHIMMER_WIDTH = 260;
const ANIMATION_DURATION_MS = 2000;

export function ShimmerSkeleton({ style, ...restProps }: ShimmerSkeletonProps) {
  const theme = useAppTheme();
  const translateX = useSharedValue(-SHIMMER_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(SHIMMER_WIDTH * 2, {
        duration: ANIMATION_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const baseAlpha = theme.mode === 'dark' ? 0.1 : 0.4;

  return (
    <Skeleton
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}
      {...restProps}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[
            `hsla(0, 0%, 100%, 0)`,
            `hsla(0, 0%, 100%, ${baseAlpha * 0.4})`,
            `hsla(0, 0%, 100%, ${baseAlpha})`,
            `hsla(0, 0%, 100%, ${baseAlpha * 0.4})`,
            `hsla(0, 0%, 100%, 0)`,
          ]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={{
            width: SHIMMER_WIDTH,
            height: '100%',
          }}
        />
      </Animated.View>
    </Skeleton>
  );
}
