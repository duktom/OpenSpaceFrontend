import { useAuth } from '@/auth/auth-context';
import { useAppTheme } from '@/providers/app-theme-provider';
import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getAuthToken } from './token-storage';

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLoading } = useAuth();
  const segments = useSegments();
  const theme = useAppTheme();

  useEffect(() => {
    const isAuthenticated = !!getAuthToken();
    const isInAuthRoute = segments[0] === 'auth';
    if (isLoading) {
      console.info('Loading user...');
      return;
    }
    if (!isAuthenticated && !isInAuthRoute) {
      setTimeout(() => router.replace('/auth'), 0);
    } else if (isAuthenticated && isInAuthRoute) {
      setTimeout(() => router.replace('/'), 0);
    }
    setLoading(false);
  }, [isLoading, router, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={theme?.colors?.primary || 'blue'} size="large" />
      </View>
    );
  }

  return children;
}
