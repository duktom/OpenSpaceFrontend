import { getErrorMessage } from '@/helpers/get-error-message';
import { View } from 'react-native';
import { TextError } from '../text-error';

type ErrorPageProps = {
  error: unknown;
};

export function ErrorPage({ error }: ErrorPageProps) {
  const errorMessage = getErrorMessage(error);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextError>{errorMessage}</TextError>
    </View>
  );
}
