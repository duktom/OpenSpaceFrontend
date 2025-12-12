import { AuthProvider } from '@/auth/auth-context';
import { AppPaperProvider } from '@/providers/app-paper-provider';
import { AppThemeProvider } from '@/providers/app-theme-provider';
import '@/styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AppThemeProvider>
            <AppPaperProvider>
              <SafeAreaProvider>
                <Slot />
              </SafeAreaProvider>
            </AppPaperProvider>
          </AppThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
