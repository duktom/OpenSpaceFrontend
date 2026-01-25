import { OpacityButton } from '@/components/opacity-button';
import { TextError } from '@/components/text-error';
import { TextFormInput } from '@/components/text-form-input';
import {
    LoginDataSchema,
} from '@/services/api/account/account.types';
import { useAuth } from '@/services/auth/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import { z } from 'zod';
import { RegisterCompanyDataSchema } from '../api/company/company.types';
import { RegisterUserDataSchema } from '../api/user/user.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormValuesSchema = z.union([
  LoginDataSchema,
  RegisterUserDataSchema,
  RegisterCompanyDataSchema,
]);
type FormValues = z.infer<typeof FormValuesSchema>;
type FormMode = 'login' | 'registerUser' | 'registerCompany';

type FormModeOption = { value: FormMode; label: string; testID?: string };
const FORM_MODE_OPTIONS = [
  { value: 'registerUser', label: 'User', testID: 'AUTH.FORM_CONTAINER.REGISTER_USER_BUTTON' },
  {
    value: 'registerCompany',
    label: 'Company',
    testID: 'AUTH.FORM_CONTAINER.REGISTER_COMPANY_BUTTON',
  },
] as const satisfies FormModeOption[];

const FORM_SCHEMAS = {
  login: LoginDataSchema,
  registerUser: RegisterUserDataSchema,
  registerCompany: RegisterCompanyDataSchema,
} as const satisfies Record<FormMode, z.ZodObject>;

const useAuthSubmitAction = () => {
  const { login, registerUserThenLogin, registerCompanyThenLogin } = useAuth();

  return (formMode: FormMode, formData: FormValues): Promise<string | null> => {
    if (formMode === 'login') {
      const data = FORM_SCHEMAS.login.parse(formData);
      return login(data);
    }
    if (formMode === 'registerUser') {
      const data = FORM_SCHEMAS.registerUser.parse(formData);
      return registerUserThenLogin(data);
    }
    if (formMode === 'registerCompany') {
      const data = FORM_SCHEMAS.registerCompany.parse(formData);
      return registerCompanyThenLogin(data);
    }
    formMode satisfies never;
    throw new Error(`Unhandled case for formMode '${formMode}'`);
  };
};

export function AuthForm() {
  const router = useRouter();
  const [formMode, setFormMode] = useState<FormMode>('login');
  const [apiError, setApiError] = useState<string | null>(null);
  const authSubmitAction = useAuthSubmitAction();

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(FORM_SCHEMAS[formMode]),
    defaultValues: {
      // Login
      email: '',
      password: '',
      // Register
      confirmPassword: '',
      // Register user
      firstName: '',
      lastName: '',
      birthDate: null,
      // Register company
      ein: '',
      name: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (submitData: FormValues) => {
    setApiError(null);

    const error = await authSubmitAction(formMode, submitData);
    if (error) return setApiError(error);
    reset();
    router.replace('/');
  };

  const clearErrors = () => {
    reset(undefined, {
      keepValues: true,
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    setApiError(null);
  };

  const toggleLoginRegisterFormMode = () => {
    setFormMode((prev) => (prev === 'login' ? 'registerUser' : 'login'));
    clearErrors();
  };

  return (
    <View className="gap-1 px-6 pb-4" testID="AUTH.FORM_CONTAINER">
      <Text
        className="!text-center mb-4 mt-6"
        testID="AUTH.FORM_CONTAINER.TITLE"
        variant="headlineMedium"
      >
        {formMode === 'login' ? 'Welcome back!' : 'Create account'}
      </Text>

      {/* BACKEND ERROR */}
      {apiError ? <TextError className="!text-center mb-3">{apiError}</TextError> : null}

      {/* REGISTER ACCOUNT TYPE */}
      {formMode !== 'login' ? (
        <SegmentedButtons
          buttons={FORM_MODE_OPTIONS}
          value={formMode}
          onValueChange={(value) => {
            setFormMode(value);
            clearErrors();
          }}
        />
      ) : null}

      {/* FIRST NAME */}
      {formMode === 'registerUser' ? (
        <TextFormInput
          control={control}
          label="First Name"
          name="firstName"
          placeholder="John"
          testID="AUTH.FORM_CONTAINER.FIRST_NAME_INPUT"
        />
      ) : null}

      {/* LAST NAME */}
      {formMode === 'registerUser' ? (
        <TextFormInput
          control={control}
          label="Last name"
          name="lastName"
          placeholder="Dope"
          testID="AUTH.FORM_CONTAINER.LAST_NAME_INPUT"
        />
      ) : null}

      {/* Company name */}
      {formMode === 'registerCompany' ? (
        <TextFormInput
          control={control}
          label="Company name"
          name="name"
          placeholder="Mirosoft"
          testID="AUTH.FORM_CONTAINER.COMPANY_NAME_INPUT"
        />
      ) : null}

      {/* EIN */}
      {formMode === 'registerCompany' ? (
        <TextFormInput
          control={control}
          label="EIN"
          name="ein"
          placeholder="1234567890"
          testID="AUTH.FORM_CONTAINER.EIN_INPUT"
        />
      ) : null}

      {/* EMAIL */}
      <TextFormInput
        autoCapitalize="none"
        control={control}
        keyboardType="email-address"
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        testID="AUTH.FORM_CONTAINER.EMAIL_INPUT"
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
          marginTop: formMode !== 'login' ? 12 : 0,
        }}
        testID="AUTH.FORM_CONTAINER.PASSWORD_INPUT"
      />

      {/* CONFIRM PASSWORD */}
      {formMode !== 'login' ? (
        <TextFormInput
          secureTextEntry
          autoCapitalize="none"
          control={control}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="******"
          testID="AUTH.FORM_CONTAINER.CONFIRM_PASSWORD_INPUT"
        />
      ) : null}

      {/* BUTTONS */}
      <View className="flex items-center mt-5">
        <OpacityButton
          className="w-1/2 !min-w-44"
          disabled={formState.isSubmitting || (formState.isSubmitted && !formState.isValid)}
          isLoading={formState.isSubmitting}
          testID="AUTH.FORM_CONTAINER.SUBMIT_BUTTON"
          variant="contained"
          onPress={handleSubmit(onSubmit)}
        >
          {formMode !== 'login' ? 'Register' : 'Login'}
        </OpacityButton>
      </View>

      <Button
        mode="text"
        testID="AUTH.FORM_CONTAINER.TOGGLE_LOGIN_REGISTER_BUTTON"
        onPress={toggleLoginRegisterFormMode}
      >
        {formMode === 'login'
          ? "Don't have an account? Register"
          : 'Already have an account? Login'}
      </Button>
    </View>
  );
}
