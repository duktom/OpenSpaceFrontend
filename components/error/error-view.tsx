import { getErrorMessage } from '@/helpers/get-error-message';
import { useAppTheme } from '@/providers/app-theme-provider';
import { Href, usePathname, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Centered } from '../centered';
import { OpacityButton } from '../opacity-button';
import { TextError } from '../text-error';

type ErrorViewProps = Omit<ComponentProps<typeof Centered>, 'children'> & {
  textErrorProps?: Omit<ComponentProps<typeof TextError>, 'children'>;
  error: unknown;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorView({
  error,
  textErrorProps,
  onRetry,
  retryLabel = 'Try again',
  style,
  ...restProps
}: ErrorViewProps) {
  const theme = useAppTheme();
  const router = useRouter();
  const pathname = usePathname();
  const errorMessage = getErrorMessage(error);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }

    router.replace(pathname as Href);
  };

  return (
    <Centered
      style={[
        {
          backgroundColor: theme.colors.background.dark,
          paddingHorizontal: 24,
          gap: 16,
        },
        style,
      ]}
      {...restProps}
    >
      <TextError variant="bodyLarge" {...textErrorProps}>
        {errorMessage}
      </TextError>

      <OpacityButton size="md" variant="outline" onPress={handleRetry}>
        {retryLabel}
      </OpacityButton>
    </Centered>
  );
}
