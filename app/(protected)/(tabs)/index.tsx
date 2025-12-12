import { BriefcaseIcon } from '@/assets/svgs/briefcase-icon';
import { CityIcon } from '@/assets/svgs/city-icon';
import { SocialIcon } from '@/assets/svgs/social-icon';
import { CommunityPostsList } from '@/components/community-posts-list';
import { CompanyProfilesList } from '@/components/company-profiles-list';
import { JobOffersList } from '@/components/job-offers-list';
import { LogoutButton } from '@/components/logout-button';
import { SafeView } from '@/components/safe-view';
import { TabButton } from '@/components/tab-button';
import { TabsContainer } from '@/components/tabs-container';
import { ToggleThemeButton } from '@/components/toggle-theme-button';
import { useAppTheme } from '@/providers/app-theme-provider';
import { FC, Fragment, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';

type TabValue = 'jobOffers' | 'companyProfiles' | 'community';

type TabButtonData = {
  title: string;
  value: TabValue;
  Icon: FC<SvgProps>;
  Content: FC;
};

const TAB_BUTTONS_DATA: TabButtonData[] = [
  {
    title: 'Job Offers',
    value: 'jobOffers',
    Icon: BriefcaseIcon,
    Content: JobOffersList,
  },
  {
    title: 'Companies',
    value: 'companyProfiles',
    Icon: CityIcon,
    Content: CompanyProfilesList,
  },
  {
    title: 'Community',
    value: 'community',
    Icon: SocialIcon,
    Content: CommunityPostsList,
  },
];

export default function HomeScreen() {
  const theme = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabValue>('jobOffers');

  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
      }}
      withPaddingBottom={false}
    >
      <View style={{ backgroundColor: theme.colors.background.light }}>
        <View className="flex items-center justify-center">
          <Searchbar
            placeholder="Search by company name.."
            style={{
              width: '80%',
              margin: 20,
              borderColor: theme.colors.border,
              borderWidth: 1,
              backgroundColor: theme.colors.elevation.level0,
            }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TabsContainer>
          {TAB_BUTTONS_DATA.map((tabButtonData) => (
            <TabButton
              key={tabButtonData.value}
              Icon={tabButtonData.Icon}
              selected={selectedTab === tabButtonData.value}
              title={tabButtonData.title}
              onPress={() => setSelectedTab(tabButtonData.value)}
            />
          ))}
        </TabsContainer>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 16,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        {TAB_BUTTONS_DATA.map((tabButtonData) => {
          if (selectedTab !== tabButtonData.value) {
            return <Fragment key={tabButtonData.value}></Fragment>;
          }
          return <tabButtonData.Content key={tabButtonData.value} />;
        })}
        <LogoutButton />
        <ToggleThemeButton />
      </ScrollView>
    </SafeView>
  );
}
