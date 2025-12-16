import { ArrowLeftIcon } from '@/assets/svgs/arrow-left-icon';
import { useRouter } from 'expo-router';
import { ActionIcon, ActionIconProps } from './action-icon';

type GoBackButtonProps = Omit<ActionIconProps, 'onPress' | 'Icon'>;

export function GoBackButton(props: GoBackButtonProps) {
  const router = useRouter();

  if (!router.canGoBack()) return null;

  return <ActionIcon Icon={ArrowLeftIcon} onPress={() => router.back()} {...props} />;
}
