import { AuthProvider } from '@/auth/auth-context';
import { AppPaperProvider } from '@/providers/app-paper-provider';
import { AppThemeProvider } from '@/providers/app-theme-provider';
import { EnvProvider } from '@/providers/env-provider';
import '@/styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <EnvProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppThemeProvider>
            <AppPaperProvider>
              <AuthProvider>
                <SafeAreaProvider>
                  <Slot />
                </SafeAreaProvider>
              </AuthProvider>
            </AppPaperProvider>
          </AppThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </EnvProvider>
  );
}
