import { useAppTheme } from '@/providers/app-theme-provider';
import { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type ActionIconProps = Omit<TouchableOpacityProps, 'children'> & {
  Icon: FC<SvgProps>;
  iconColor?: SvgProps['color'];
};

export function ActionIcon({ Icon, iconColor, style, ...restButtonProps }: ActionIconProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        {
          width: 35,
          height: 35,
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 'auto',
          backgroundColor: theme.colors.background.light,
        },
        style,
      ]}
      {...restButtonProps}
    >
      <Icon color={iconColor ?? theme.colors.text.base} height={24} width={24} />
    </TouchableOpacity>
  );
}
