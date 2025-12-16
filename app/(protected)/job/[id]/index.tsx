import { api } from '@/api/api';
import mockJobAvatar from '@/assets/images/mock-job-avatar.png';
import mockJobImage from '@/assets/images/mock-job-image.png';
import { Avatar } from '@/components/avatar';
import { ErrorPage } from '@/components/error/error-page';
import { FavoriteJobButton } from '@/components/favorite-job-button';
import { GoBackButton } from '@/components/go-back-button';
import { LoadingIcon } from '@/components/loading/loading-icon';
import { Rating } from '@/components/rating';
import { SafeView } from '@/components/safe-view';
import { getFormattedCurrency } from '@/helpers/get-formatted-currency';
import { getImageSizeAccordingToScreenWidth } from '@/helpers/get-image-size-according-to-screen-width';
import { useAppTheme } from '@/providers/app-theme-provider';
import { Job } from '@/types/backend.types';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const jobId = Array.isArray(id) ? id[0] : id;
  const theme = useAppTheme();
  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => api.jobs.get(jobId),
    queryKey: ['jobs', 'get'],
  });

  const applyToJob = () => {
    alert('Functionality not implemented yet!');
  };

  if (isLoading) return <LoadingIcon />;
  if (isError || !job) return <ErrorPage error={error} />;

  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
        justifyContent: 'space-between',
        gap: 3,
      }}
      withPaddingBottom={true}
    >
      <View style={{ flex: 1 }}>
        {/* Top image */}
        <View style={{ position: 'relative', marginVertical: 10 }}>
          <Toolbar jobId={jobId} />
          <Image
            resizeMode="contain"
            source={mockJobImage}
            style={getImageSizeAccordingToScreenWidth(mockJobImage, 1)}
          />
        </View>

        {/* Short company info */}
        <View style={{ marginHorizontal: 10 }}>
          <Text className="!font-bold" variant="titleLarge">
            Microsoft
          </Text>
          <Text style={{ marginTop: -1, color: theme.colors.text.base }}>
            Database administrator
          </Text>
          <Text style={{ marginTop: 4, color: theme.colors.text.muted }}>
            {'Al. Jerozolimskie 195A, 02-222 Warszawa'}
          </Text>
        </View>

        <Divider style={{ marginTop: 10 }} />

        <ScrollView showsVerticalScrollIndicator style={{ paddingTop: 5, flex: 1 }}>
          {/* Company account */}
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Avatar isVerified source={mockJobAvatar} />
              <View>
                <Text className="!font-bold" variant="titleMedium">
                  Microsoft
                </Text>
                <Text variant="bodySmall">{`Account created in ${job.createdAt.getFullYear()}`}</Text>
                <Rating
                  rating={4.8}
                  textProps={{
                    variant: 'bodySmall',
                    style: {
                      fontWeight: 900,
                    },
                  }}
                />
              </View>
            </View>
          </View>

          {/* Company info */}
          <View style={{ marginHorizontal: 10, marginTop: 20, gap: 8, paddingBottom: 10 }}>
            <Text variant="titleMedium">Database Administrator (DBA)</Text>
            <Text variant="bodyMedium">
              Join the Microsoft engineering team and help us manage global database systems that
              are critical to our business. We are looking for an expert who will ensure optimal
              performance, availability, and security for our data platforms.
            </Text>
            <Text style={{ marginTop: 6 }} variant="bodyMedium">
              Required qualifications: Minimum 3 years of experience as a DBA. Proficiency in MS SQL
              Server and strong experience with the Microsoft Azure Data platform. Ability to write
              and optimize T-SQL code. Knowledge of database security and automation issues (e.g.,
              PowerShell).
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 10,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingTop: 10,
        }}
      >
        <View>
          <Text className="!font-bold" variant="bodyLarge">
            {getFormattedCurrency(6000)}
          </Text>
          <Text variant="bodySmall">Per month</Text>
        </View>
        <TouchableOpacity
          className="w-1/2 !rounded-lg"
          style={{
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={applyToJob}
        >
          <Text style={{ color: theme.colors.text.alwaysWhite }} variant="labelLarge">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

type ToolbarProps = {
  jobId: Job['id'];
};

function Toolbar({ jobId }: ToolbarProps) {
  return (
    <>
      <GoBackButton
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 1,
        }}
      />
      <FavoriteJobButton jobId={jobId} />
    </>
  );
}
