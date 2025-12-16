import { useAuth } from '@/auth/auth-context';
import { TextError } from '@/components/text-error';
import { TextFormInput } from '@/components/text-form-input';
import {
  companyAuthFormSchema,
  loginCompanySchema,
  registerCompanySchema,
} from '@/schemas/company-auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { z } from 'zod';

type FormValues = z.infer<typeof companyAuthFormSchema>;

export function CompanyAuthForm() {
  const { login, registerThenLogin } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(isRegister ? registerCompanySchema : loginCompanySchema),
    defaultValues: {
      name: '',
      ein: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    if (!formState.isValid) return;
    setApiError(null);
    const error = isRegister
      ? await registerThenLogin(email.trim(), password)
      : await login(email.trim(), password);

    if (error) return setApiError(error);
    reset();
    router.replace('/');
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    // Reset submitted state & keep values
    reset(control._formValues);
  };

  return (
    <>
      <Text className="!text-center mb-4 mt-6" variant="headlineMedium">
        {isRegister ? 'Create Account' : 'Welcome back!'}
      </Text>

      {/* NAME */}
      {isRegister ? (
        <TextFormInput control={control} label="Name" name="name" placeholder="Mirosoft" />
      ) : null}

      {/* EIN */}
      {isRegister ? (
        <TextFormInput control={control} label="EIN" name="ein" placeholder="1234567890" />
      ) : null}

      {/* EMAIL */}
      <TextFormInput
        autoCapitalize="none"
        control={control}
        keyboardType="email-address"
        label="Email"
        name="email"
        placeholder="example@gmail.com"
      />

      {/* PASSWORD */}
      <TextFormInput
        secureTextEntry
        autoCapitalize="none"
        control={control}
        label="Password"
        name="password"
        placeholder="******"
        style={{
          marginTop: isRegister ? 12 : 0,
        }}
      />

      {/* CONFIRM PASSWORD */}
      {isRegister ? (
        <TextFormInput
          secureTextEntry
          autoCapitalize="none"
          control={control}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="******"
        />
      ) : null}

      {/* BACKEND ERROR */}
      {apiError ? <TextError>{apiError}</TextError> : null}

      {/* BUTTONS */}
      <View className="flex items-center mt-5">
        <Button
          className="w-1/2 !min-w-44 !rounded-lg"
          disabled={formState.isSubmitted && !formState.isValid}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </View>

      <Button mode="text" onPress={toggleMode}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </>
  );
}
