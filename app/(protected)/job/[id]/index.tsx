import mockJobImage from '@/assets/images/mock-job-image.png';
import { Avatar } from '@/components/avatar';
import { ErrorView } from '@/components/error/error-view';
import { FavoriteJobButton } from '@/components/favorite-job-button';
import { GoBackButton } from '@/components/go-back-button';
import { LoadingIconView } from '@/components/loading/loading-icon-view';
import { OpacityButton } from '@/components/opacity-button';
import { Rating } from '@/components/rating';
import { SafeView } from '@/components/safe-view';
import { getFormattedCurrency } from '@/helpers/get-formatted-currency';
import { getImageSizeAccordingToScreenWidth } from '@/helpers/get-image-size-according-to-screen-width';
import { useAppTheme } from '@/providers/app-theme-provider';
import { api } from '@/services/api';
import { Job } from '@/services/api/job/job.types';
import { MOCK_DEFAULT_COMPANY_PROFILE_IMAGE } from '@/services/api/mock/mock-company';
import { MOCK_DEFAULT_JOB_PROFILE_IMAGE } from '@/services/api/mock/mock-job';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const formatCompanyLocation = ({city, street, buildingNumber, apartmentNumber, postalCode}: Job['company']['address']): string => {
  return `${city} ${street} ${buildingNumber}/${apartmentNumber} ${postalCode}`
}

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const jobId = Number(Array.isArray(id) ? id[0] : id);
  const theme = useAppTheme();
  const router = useRouter();
  const { data: job, isLoading, isError, error } = api.job.queries.useGetJobById({ id: jobId });

  const applyToJob = () => {
    alert('Functionality not implemented yet!');
  };

  if (isLoading) return <LoadingIconView />;
  if (isError || !job) return <ErrorView error={error} />;

  const navigateToCompanyProfile = () => {
    router.push(`/company/${job.company.id}`);
  };

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
            source={{ uri: job.profileImgLink ?? MOCK_DEFAULT_JOB_PROFILE_IMAGE}}
            style={getImageSizeAccordingToScreenWidth(mockJobImage, 1)}
          />
        </View>

        {/* Short company info */}
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={navigateToCompanyProfile}>
          <Text className="!font-bold" variant="titleLarge" style={{ color: theme.colors.primary }}>
            {job.company.name}
          </Text>
          <Text style={{ marginTop: -1, color: theme.colors.text.base }}>{job.title}</Text>
          <Text style={{ marginTop: 4, color: theme.colors.text.muted }}>{formatCompanyLocation(job.company.address)}</Text>
        </TouchableOpacity>

        <Divider style={{ marginTop: 10 }} />

        <ScrollView showsVerticalScrollIndicator style={{ paddingTop: 5, flex: 1 }}>
          {/* Company account */}
          <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={navigateToCompanyProfile}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Avatar isVerified source={{ uri: job.company.profileImgLink ?? MOCK_DEFAULT_COMPANY_PROFILE_IMAGE }} />
              <View>
                <Text className="!font-bold" variant="titleMedium" style={{ color: theme.colors.primary }}>
                  {job.company.name}
                </Text>
                <Text variant="bodySmall">{`Account created in ${job.company.creationDate.getFullYear()}`}</Text>
                <Rating
                  rating={job.company.rating}
                  textProps={{
                    variant: 'bodySmall',
                    style: {
                      fontWeight: 900,
                    },
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Company info */}
          <View style={{ marginHorizontal: 10, marginTop: 20, gap: 8, paddingBottom: 10 }}>
            <Text variant="titleMedium">{job.title}</Text>
            <Text variant="bodyMedium">{job.description}</Text>
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
            {getFormattedCurrency(job.payoff)}
          </Text>
          <Text variant="bodySmall">Per month</Text>
        </View>
        <OpacityButton className="w-1/2" onPress={applyToJob}>
          Apply
        </OpacityButton>
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
