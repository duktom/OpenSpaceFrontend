import { useAuth } from '@/auth/auth-context';
import { TextError } from '@/components/text-error';
import { useAppTheme } from '@/providers/app-theme-provider';
import { authSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

const formSchema = authSchema;
type FormValues = z.infer<typeof authSchema>;

export default function AuthScreen() {
  const { login, registerThenLogin } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const theme = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    if (!isValid) return;
    setApiError(null);
    const error = isSignUp
      ? await registerThenLogin(email.trim(), password)
      : await login(email.trim(), password);

    if (error) return setApiError(error);
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View
        className="flex-1 justify-center p-4 gap-1"
        style={{ backgroundColor: theme.colors.background.base }}
      >
        <Text className="!text-center mb-8" variant="headlineMedium">
          {isSignUp ? 'Create Account' : 'Welcome back!'}
        </Text>

        {/* EMAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                autoCapitalize="none"
                error={!!formErrors.email}
                keyboardType="email-address"
                label="Email"
                mode="outlined"
                placeholder="example@gmail.com"
                value={value}
                onChangeText={onChange}
              />
              {formErrors.email?.message ? <TextError>{formErrors.email.message}</TextError> : null}
            </>
          )}
        />

        {/* PASSWORD */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                error={!!formErrors.password}
                label="Password"
                mode="outlined"
                placeholder="******"
                value={value}
                onChangeText={onChange}
              />
              {formErrors.password?.message ? (
                <TextError>{formErrors.password.message}</TextError>
              ) : null}
            </>
          )}
        />

        {/* BACKEND ERROR */}
        {apiError ? <TextError>{apiError}</TextError> : null}

        {/* BUTTONS */}
        <Button className="!mt-5" mode="contained" onPress={handleSubmit(onSubmit)}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>

        <Button mode="text" onPress={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
