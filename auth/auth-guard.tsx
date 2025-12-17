import { useAuth } from '@/auth/auth-context';
import { useAppTheme } from '@/providers/app-theme-provider';
import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const theme = useAppTheme();

  useEffect(() => {
    if (isLoading) return;

    const isInAuthRoute = segments[0] === 'auth';

    if (!isAuthenticated && !isInAuthRoute) {
      router.replace('/auth');
    } else if (isAuthenticated && isInAuthRoute) {
      router.replace('/');
    }
  }, [isLoading, isAuthenticated, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={theme?.colors?.primary || 'blue'} size="large" />
      </View>
    );
  }

  return children;
}
