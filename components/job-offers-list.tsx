import mockJobImage from '@/assets/images/mock-job-image.png';
import { getFormattedCurrency } from '@/helpers/get-formatted-currency';
import { getImageSizeAccordingToScreenWidth } from '@/helpers/get-image-size-according-to-screen-width';
import { useAppTheme } from '@/providers/app-theme-provider';
import { api } from '@/services/api';
import { Job } from '@/services/api/job/job.types';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ErrorView } from './error/error-view';
import { Rating } from './rating';
import { ShimmerSkeleton } from './shimmer-skeleton';

export function JobOffersList() {
  const { data: jobs, isLoading, isError, error } = api.job.queries.useGetAllJobs();

  if (isLoading) {
    return (
      <>
        <JobOfferSkeleton />
        <JobOfferSkeleton />
      </>
    );
  }
  if (isError || !jobs) return <ErrorView error={error} />;

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <JobOffer key={index} job={jobs[0]} />
      ))}
    </>
  );
}

type JobOfferProps = {
  job: Job;
};

function JobOffer({ job }: JobOfferProps) {
  const theme = useAppTheme();
  const router = useRouter();

  const redirectToJobDetails = () => {
    router.push(`/job/${job.id}`);
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

function JobOfferSkeleton() {
  const theme = useAppTheme();
  const imageSize = getImageSizeAccordingToScreenWidth(
    require('@/assets/images/mock-job-image.png'),
    0.91
  );

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.colors.background.light,
        borderRadius: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      {/* Image skeleton */}
      <ShimmerSkeleton
        borderRadius={10}
        height={imageSize.height}
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        width={imageSize.width}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 6,
          width: '95%',
        }}
      >
        {/* Left content */}
        <View style={{ flex: 1 }}>
          <ShimmerSkeleton height={20} width={140} />
          <ShimmerSkeleton height={16} style={{ marginTop: 6 }} width={180} />
          <ShimmerSkeleton height={14} style={{ marginTop: 8 }} width={220} />
          <ShimmerSkeleton height={18} style={{ marginTop: 12 }} width={90} />
        </View>

        {/* Rating */}
        <ShimmerSkeleton borderRadius={12} height={24} width={50} />
      </View>
    </View>
  );
}
