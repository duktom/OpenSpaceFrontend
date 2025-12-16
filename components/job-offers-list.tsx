import mockJobImage from '@/assets/images/mock-job-image.png';
import { getFormattedCurrency } from '@/helpers/get-formatted-currency';
import { getImageSizeAccordingToScreenWidth } from '@/helpers/get-image-size-according-to-screen-width';
import { useAppTheme } from '@/providers/app-theme-provider';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Rating } from './rating';

export function JobOffersList() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <JobOffer key={index} />
      ))}
    </>
  );
}

const FAKE_JOB_ID = '1';

function JobOffer() {
  const theme = useAppTheme();
  const router = useRouter();

  const redirectToJobDetails = () => {
    router.push(`/job/${FAKE_JOB_ID}`);
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.colors.background.light,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
      onPress={redirectToJobDetails}
    >
      <Image
        resizeMode="contain"
        source={mockJobImage}
        style={{
          ...getImageSizeAccordingToScreenWidth(mockJobImage, 0.91),
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 6,
          width: '95%',
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
            {getFormattedCurrency(6000)}
          </Text>
        </View>
        <View>
          <Rating rating={4.8} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
