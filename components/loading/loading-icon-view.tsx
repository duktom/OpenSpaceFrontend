import { useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps } from 'react';
import { Centered } from '../centered';
import { LoadingIcon } from './loading-icon';

type LoadingIconViewProps = Omit<ComponentProps<typeof Centered>, 'children'> & {
  loadingIconProps?: ComponentProps<typeof LoadingIcon>;
};

export function LoadingIconView({ style, loadingIconProps, ...restProps }: LoadingIconViewProps) {
  const theme = useAppTheme();

  return (
    <Centered style={[{ backgroundColor: theme.colors.background.dark }, style]} {...restProps}>
      <LoadingIcon size="large" {...loadingIconProps} />
    </Centered>
  );
}
