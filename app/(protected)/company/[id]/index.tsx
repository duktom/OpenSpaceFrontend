import { Avatar } from '@/components/avatar';
import { ErrorView } from '@/components/error/error-view';
import { GoBackButton } from '@/components/go-back-button';
import { LoadingIconView } from '@/components/loading/loading-icon-view';
import { SafeView } from '@/components/safe-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { api } from '@/services/api';
import { MOCK_DEFAULT_COMPANY_PROFILE_IMAGE } from '@/services/api/mock/mock-company';
import { MOCK_IS_VERIFIED } from '@/services/api/mock/mock-is-verified';
import { MOCK_RATINGS } from '@/services/api/mock/mock-opinion';
import { MOCK_PAST_DATE } from '@/services/api/mock/mock-past-date';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Divider, Text } from 'react-native-paper';

const getCompanyFoundedText = (creationDate: Date): string => {
  const date = typeof creationDate === 'string' ? new Date(creationDate) : creationDate;
  const now = new Date();
  const yearsAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

  if (yearsAgo === 0) return 'Account created less then one year ago';
  if (yearsAgo === 1) return 'Account created year ago';
  return `Account created ${yearsAgo} years ago`;
};

type StarsRatingProps = {
  rating: number;
};

function StarsRating({ rating }: StarsRatingProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={{ fontSize: 16 }}>
          {star <= rating ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
}

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams();
  const companyId = Number(Array.isArray(id) ? id[0] : id);
  const theme = useAppTheme();

  const {
    data: company,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
  } = api.company.queries.useGetCompanyById({ id: companyId });
  const {
    data: companyRating,
    isLoading: isCompanyRatingLoading,
    isError: isCompanyRatingError,
    error: companyRatingError,
  } = api.companyRating.queries.useGetCompanyRatingById({ id: companyId });

  if (isCompanyLoading || isCompanyRatingLoading) return <LoadingIconView />;
  if (isCompanyError || !company || isCompanyRatingError || !companyRating) {
    return <ErrorView error={companyError || companyRatingError} />;
  }

  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
      }}
      withPaddingBottom={true}
    >
      <View style={{ marginBottom: 10 }}>
        <GoBackButton />
      </View>

      <ScrollView showsVerticalScrollIndicator style={{ flex: 1 }}>
        {/* Company header with logo and name */}
        <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'flex-start' }}>
            <Avatar
              isVerified={MOCK_IS_VERIFIED}
              source={{ uri: company.profileImgLink ?? MOCK_DEFAULT_COMPANY_PROFILE_IMAGE }}
            />
            <View style={{ flex: 1 }}>
              <Text className="!font-bold" variant="headlineSmall">
                {company.name}
              </Text>
              <Text style={{ marginTop: 4, color: theme.colors.text.muted }} variant="bodySmall">
                {getCompanyFoundedText(new Date(MOCK_PAST_DATE))}
              </Text>
            </View>
          </View>
        </View>

        <Divider />

        {/* Company description */}
        {company.description ? (
          <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
            <Markdown
              style={{
                body: { color: theme.colors.text.base },
                paragraph: { marginBottom: 8 },
                strong: { fontWeight: 'bold' },
              }}
            >
              {company.description}
            </Markdown>
          </View>
        ) : null}

        {/* Company rating section */}
        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text className="!font-bold" variant="displaySmall">
                {companyRating.rating}
              </Text>
              <View style={{ marginTop: 4 }}>
                <StarsRating rating={Math.floor(companyRating.rating)} />
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text className="!font-bold" variant="headlineSmall">
                {companyRating.ratingsCount}
              </Text>
              <Text style={{ marginTop: 2, color: theme.colors.text.muted }} variant="bodySmall">
                Reviews
              </Text>
            </View>
          </View>

          {/* User ratings horizontal scroll */}
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
          >
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {MOCK_RATINGS.map((rating) => (
                <View
                  key={rating.id}
                  style={{
                    width: 280,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: theme.colors.background.light,
                    borderColor: theme.colors.border,
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                      <View style={{ width: 48, height: 48 }}>
                        <Avatar source={{ uri: rating.avatar }} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text className="!font-bold" variant="bodyMedium">
                          {rating.author}
                        </Text>
                      </View>
                    </View>
                    <Text className="!font-bold" style={{ fontSize: 14 }}>
                      ⭐ {rating.rating}
                    </Text>
                  </View>
                  <Text
                    style={{ color: theme.colors.text.base, lineHeight: 18 }}
                    variant="bodySmall"
                  >
                    {rating.text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeView>
  );
}
