import { FilledHeartIcon } from '@/assets/svgs/filled-heart-icon';
import { OutlineHeartIcon } from '@/assets/svgs/outline-heart-icon';
import { useAppTheme } from '@/providers/app-theme-provider';
import { ActionIcon, ActionIconProps } from './action-icon';

type LikeButtonProps = Omit<ActionIconProps, 'Icon'> & {
  isLiked: boolean;
};

export function LikeButton({ isLiked, ...restProps }: LikeButtonProps) {
  const theme = useAppTheme();

  const iconColor = isLiked ? theme.colors.primary : theme.colors.text.base;

  return (
    <ActionIcon
      Icon={isLiked ? FilledHeartIcon : OutlineHeartIcon}
      iconColor={iconColor}
      {...restProps}
    />
  );
}
