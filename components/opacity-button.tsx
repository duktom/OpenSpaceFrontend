import { AppThemeContextType, useAppTheme } from '@/providers/app-theme-provider';
import { ComponentProps } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator, MD3TypescaleKey, Text, TextProps } from 'react-native-paper';

type OpacityButtonVariant = 'contained' | 'outline';
type OpacityButtonSize = 'sm' | 'md' | 'lg';

type OpacityButtonProps<T = MD3TypescaleKey> = ComponentProps<typeof TouchableOpacity> & {
  children: string | number;
  isLoading?: boolean;
  variant?: OpacityButtonVariant;
  size?: OpacityButtonSize;
  textProps?: TextProps<T>;
};

type VariantStyleMap = {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

type SizeStyle = {
  container: ViewStyle;
  textVariant: keyof typeof MD3TypescaleKey;
};

const SIZE_STYLES: Record<OpacityButtonSize, SizeStyle> = {
  sm: {
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    textVariant: 'labelMedium',
  },
  md: {
    container: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    textVariant: 'labelLarge',
  },
  lg: {
    container: {
      paddingVertical: 12,
      paddingHorizontal: 26,
      borderRadius: 8,
    },
    textVariant: 'titleSmall',
  },
};

const getDisabledStyle = (theme: AppThemeContextType): VariantStyleMap => {
  return {
    container: {
      backgroundColor: theme.colors.background.light,
    },
    text: {
      color: theme.colors.text.muted,
    },
  };
};

const getContainedStyle = (theme: AppThemeContextType): VariantStyleMap => {
  return {
    container: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.text.alwaysWhite,
    },
  };
};

const getOutlineStyle = (theme: AppThemeContextType): VariantStyleMap => {
  return {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.primary,
    },
  };
};

const getVariantStyle = (
  theme: AppThemeContextType,
  variant: OpacityButtonVariant,
  disabled?: boolean
): VariantStyleMap => {
  if (disabled) return getDisabledStyle(theme);
  if (variant === 'outline') return getOutlineStyle(theme);

  variant satisfies 'contained';
  return getContainedStyle(theme);
};

export function OpacityButton({
  variant = 'contained',
  size = 'md',
  style,
  onPress,
  disabled,
  isLoading,
  children,
  textProps,
  ...restProps
}: OpacityButtonProps) {
  const theme = useAppTheme();
  const variantStyle = getVariantStyle(theme, variant, disabled);
  const sizeStyle = SIZE_STYLES[size];

  const handleOnPress: TouchableOpacityProps['onPress'] = (event) => {
    if (disabled) return;
    onPress?.(event);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[sizeStyle.container, variantStyle.container, style]}
      onPress={handleOnPress}
      {...restProps}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text.alwaysWhite} />
      ) : (
        <Text
          variant={sizeStyle.textVariant}
          {...textProps}
          style={[{ textAlign: 'center' }, textProps?.style, variantStyle.text]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
