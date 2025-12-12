import mockImage from '@/assets/images/mock-image.png';
import { getImageSizeAccordingToScreenWidth } from '@/helpers/get-image-size-according-to-screen-width';
import { useAppTheme } from '@/providers/app-theme-provider';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

export function JobOffersList() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <JobOffer key={index} />
      ))}
    </>
  );
}

function JobOffer() {
  const theme = useAppTheme();

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.colors.background.light,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
      }}
    >
      <Image
        resizeMode="contain"
        source={mockImage}
        style={getImageSizeAccordingToScreenWidth(mockImage, 0.85)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 6,
          width: '90%',
        }}
      >
        <View>
          <Text className="!font-bold" variant="titleLarge">
            Microsoft
          </Text>
          <Text style={{ marginTop: -1, color: theme.colors.text.base }}>
            Database administrator
          </Text>
          <Text style={{ marginTop: 4, color: theme.colors.text.muted }}>
            {'Al. Jerozolimskie 195A, 02-222 Warszawa'}
          </Text>
          <Text className="!font-bold mt-2" variant="bodyLarge">
            {formatter.format(6000)}
          </Text>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Text>4.8</Text>
            <Text>⭐</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
