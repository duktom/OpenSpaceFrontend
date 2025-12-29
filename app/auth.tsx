import { SafeKeyboardAvoidingView } from '@/components/safe-keyboard-avoiding-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { AuthForm } from '@/services/auth/auth-form';
import { ScrollView, View } from 'react-native';

export default function AuthScreen() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
        justifyContent: 'center',
      }}
    >
      <SafeKeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <AuthForm />
        </ScrollView>
      </SafeKeyboardAvoidingView>
    </View>
  );
}
