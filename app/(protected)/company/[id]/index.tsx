import { GoBackButton } from '@/components/go-back-button';
import { SafeView } from '@/components/safe-view';
import { useAppTheme } from '@/providers/app-theme-provider';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams();
  const companyId = Number(Array.isArray(id) ? id[0] : id);
  const theme = useAppTheme();

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

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
        <Text variant="headlineLarge">Panel firmy</Text>
        <Text style={{ marginTop: 10, color: theme.colors.text.muted }}>
          Tutaj będzie się znajdować profil firmy (ID: {companyId})
        </Text>
      </View>
    </SafeView>
  );
}
