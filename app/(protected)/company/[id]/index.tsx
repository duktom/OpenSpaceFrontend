import { Avatar } from '@/components/avatar';
import { GoBackButton } from '@/components/go-back-button';
import { SafeView } from '@/components/safe-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { MOCK_COMPANY, MOCK_DEFAULT_COMPANY_PROFILE_IMAGE } from '@/services/api/mock/mock-company';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

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
                konto założone 2 lata temu
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

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeView>
  );
}
