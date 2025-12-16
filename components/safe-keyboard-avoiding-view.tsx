import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeView } from './safe-view';

export function SafeKeyboardAvoidingView({ children }: PropsWithChildren) {
  return (
    <SafeView withPaddingBottom={false}>
      <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
    </SafeView>
  );
}
