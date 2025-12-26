import { LoadingIconView } from '@/components/loading/loading-icon-view';
import { useAuth } from '@/services/auth/auth-context';
import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, useEffect, useMemo } from 'react';

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated } = useAuth();

  const inLoginRoute = segments[0] === 'auth';

  const canRender = useMemo(() => {
    if (!isAuthenticated && inLoginRoute) return true; // login/register
    if (isAuthenticated && !inLoginRoute) return true; // protected
    return false;
  }, [isAuthenticated, inLoginRoute]);

  useEffect(() => {
    if (!isAuthenticated && !inLoginRoute) {
      router.replace('/auth');
    } else if (isAuthenticated && inLoginRoute) {
      router.replace('/');
    }
  }, [isAuthenticated, inLoginRoute, router]);

  if (!canRender) return <LoadingIconView />;

  return children;
}
