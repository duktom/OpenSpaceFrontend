import { AppPaperProvider } from '@/providers/app-paper-provider';
import { AppThemeProvider } from '@/providers/app-theme-provider';
import { EnvProvider } from '@/providers/env-provider';
import { AuthProvider } from '@/services/auth/auth-context';
import '@/styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LaunchArguments } from 'react-native-launch-arguments';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const args = LaunchArguments.value();
if (args.DETOX_MODE) LogBox.ignoreAllLogs(true);

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <EnvProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppThemeProvider>
            <AppPaperProvider>
              <SafeAreaProvider>
                <AuthProvider>
                  <Slot />
                </AuthProvider>
              </SafeAreaProvider>
            </AppPaperProvider>
          </AppThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </EnvProvider>
  );
}
