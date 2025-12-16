import { VerifiedIcon } from '@/assets/svgs/verified-icon';
import { Image, ImageProps, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type AvatarProps = ImageProps & {
  isVerified?: boolean;
};

export function Avatar({ isVerified, style, ...restProps }: AvatarProps) {
  const theme = useTheme();

  return (
    <View style={{ position: 'relative', width: 52, height: 52 }}>
      <Image
        resizeMode="contain"
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: 100,
          },
          style,
        ]}
        {...restProps}
      />
      {isVerified ? (
        <VerifiedIcon
          color={theme.colors.primary}
          height={16}
          style={{ position: 'absolute', bottom: -2, right: -2 }}
          width={16}
        />
      ) : null}
    </View>
  );
}
