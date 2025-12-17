import { SafeView } from '@/components/safe-view';
import { envError } from '@/env';
import { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

const ERROR_BACKGROUND_COLOR = '#f8d7da';
const ERROR_TEXT_COLOR = '#721c24';

export function EnvProvider({ children }: Required<PropsWithChildren>) {
  if (!envError) return children;

  return (
    <SafeView style={{ flex: 1 }} withPaddingBottom={false}>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          backgroundColor: ERROR_BACKGROUND_COLOR,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold',
            color: ERROR_TEXT_COLOR,
            marginBottom: 20,
          }}
        >
          ❌ Env Errors
        </Text>
        <ScrollView contentContainerStyle={{ gap: 6 }}>
          {envError.issues.map((issue, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', color: ERROR_TEXT_COLOR }}>
                • {issue.path.join('.')}
              </Text>
              <Text style={{ color: ERROR_TEXT_COLOR }}>{issue.message}</Text>
            </View>
          ))}

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontStyle: 'italic',
              color: ERROR_TEXT_COLOR,
            }}
          >
            Please fix errors in your .env file and reload the app.
          </Text>
        </ScrollView>
      </View>
    </SafeView>
  );
}
