import { Avatar } from '@/components/avatar';
import { GoBackButton } from '@/components/go-back-button';
import { SafeView } from '@/components/safe-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { MOCK_COMPANY, MOCK_DEFAULT_COMPANY_PROFILE_IMAGE } from '@/services/api/mock/mock-company';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const getCompanyFoundedText = (creationDate: string | Date): string => {
  const date = typeof creationDate === 'string' ? new Date(creationDate) : creationDate;
  const now = new Date();
  const yearsAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  
  if (yearsAgo === 0) {
    return 'Konto założone mniej niż rok temu';
  }
  
  if (yearsAgo === 1) {
    return 'Konto założone rok temu';
  }
  
  return `Konto założone ${yearsAgo} lat temu`;
};

const renderStars = (rating: number) => {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={{ fontSize: 16 }}>
          {star <= rating ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
};

const MOCK_RATINGS = [
  {
    id: 1,
    author: 'Roman Staś',
    avatar: 'https://via.placeholder.com/40?text=RS',
    rating: 5,
    text: 'Fantastyczne miejsce do pracy! Zespół jest super, a projekty bardzo ciekawe.',
  },
  {
    id: 2,
    author: 'Magdalena B.',
    avatar: 'https://via.placeholder.com/40?text=MB',
    rating: 5,
    text: 'Świetna firma, gdzie się rozwija umiejętności i jest wspierana praca nad ważnymi projektami.',
  },
  {
    id: 3,
    author: 'Anna Kowalska',
    avatar: 'https://via.placeholder.com/40?text=AK',
    rating: 5,
    text: 'Polska perspektywa - ha. Rodzina (w sensie firma) rzeczywiście wspiera osoby w międzynarodowych zespołach.',
  },
  {
    id: 4,
    author: 'Piotr Nowak',
    avatar: 'https://via.placeholder.com/40?text=PN',
    rating: 5,
    text: 'Fantastyczne miejsce do pracy! Zespół jest super, a projekty bardzo ciekawe.',
  },
];

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams();
  const companyId = Number(Array.isArray(id) ? id[0] : id);
  const theme = useAppTheme();

  // For now using mock data - in future will fetch based on companyId
  const company = MOCK_COMPANY;

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
              isVerified 
              source={{ uri: company.profile_img_link ?? MOCK_DEFAULT_COMPANY_PROFILE_IMAGE }}
            />
            <View style={{ flex: 1 }}>
              <Text className="!font-bold" variant="headlineSmall">
                {company.name}
              </Text>
              <Text style={{ marginTop: 4, color: theme.colors.text.muted }} variant="bodySmall">
                {getCompanyFoundedText(company.creation_date)}
              </Text>
            </View>
          </View>
        </View>

        <Divider />

        {/* Company description */}
        {company.description && (
          <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
            <Text variant="bodyMedium" style={{ color: theme.colors.text.base }}>
              {company.description}
            </Text>
          </View>
        )}

        {/* Example values section */}
        <View style={{ marginHorizontal: 10, marginTop: 15 }}>
          <Text className="!font-bold" variant="titleMedium" style={{ marginBottom: 12 }}>
            Co jest dla nas ważne?
          </Text>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ marginTop: 2 }}>●</Text>
              <Text style={{ flex: 1, color: theme.colors.text.base }} variant="bodyMedium">
                Globalny wpływ – pracujemy nad projektami, które mają znaczenie dla milionów użytkowników na całym świecie
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ marginTop: 2 }}>●</Text>
              <Text style={{ flex: 1, color: theme.colors.text.base }} variant="bodyMedium">
                Innowacje – wierzymy, że technologia może być siłą napędową pozytywnych zmian
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ marginTop: 2 }}>●</Text>
              <Text style={{ flex: 1, color: theme.colors.text.base }} variant="bodyMedium">
                Ludzie – tworzymy kulturę współpracy, różnorodności i wzajemnego wsparcia
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={{ marginTop: 2 }}>●</Text>
              <Text style={{ flex: 1, color: theme.colors.text.base }} variant="bodyMedium">
                Rozwój – inwestujemy w Twój rozwój zawodowy i osobisty, oferując mentoring i możliwości pracy w międzynarodowych zespołach
              </Text>
            </View>
          </View>
        </View>

        {/* Company rating section */}
        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text className="!font-bold" variant="displaySmall">
                4.8
              </Text>
              <View style={{ marginTop: 4 }}>
                {renderStars(5)}
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text className="!font-bold" variant="headlineSmall">
                10 k+
              </Text>
              <Text style={{ marginTop: 2, color: theme.colors.text.muted }} variant="bodySmall">
                Opinii
              </Text>
            </View>
          </View>

          {/* User ratings horizontal scroll */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                      <View style={{ width: 32, height: 32 }}>
                        <Avatar source={{ uri: rating.avatar }} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text className="!font-bold" variant="bodyMedium">
                          {rating.author}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 14 }} className="!font-bold">
                      ⭐ {rating.rating}
                    </Text>
                  </View>
                  <Text style={{ color: theme.colors.text.base, lineHeight: 18 }} variant="bodySmall">
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
