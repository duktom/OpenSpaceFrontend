import { useAppTheme } from '@/providers/app-theme-provider';
import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text, TextProps } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';

type TabButtonProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
  titleProps?: Omit<TextProps<never>, 'children'>;
  Icon?: FC<SvgProps>;
};

export function TabButton({ title, selected, onPress, titleProps, Icon }: TabButtonProps) {
  const theme = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            paddingBottom: 8,
          },
          selected && {
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        {Icon ? (
          <Icon
            color={selected ? theme.colors.text.base : theme.colors.text.muted}
            height={22}
            width={28}
          />
        ) : null}
        <Text
          {...titleProps}
          style={[
            {
              color: selected ? theme.colors.text.base : theme.colors.text.muted,
              fontWeight: selected ? 'bold' : 'normal',
            },
            titleProps?.style,
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
