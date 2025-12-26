import { SafeKeyboardAvoidingView } from '@/components/safe-keyboard-avoiding-view';
import { SafeView } from '@/components/safe-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { AuthForm } from '@/services/auth/auth-form';
import { ScrollView } from 'react-native';

export default function AuthScreen() {
  const theme = useAppTheme();

  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
        justifyContent: 'center',
      }}
      withPaddingBottom={false}
    >
      <SafeKeyboardAvoidingView>
        <ScrollView>
          <AuthForm />
        </ScrollView>
      </SafeKeyboardAvoidingView>
    </SafeView>
  );
}
