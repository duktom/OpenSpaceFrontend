import { CompanyAuthForm } from '@/auth/company-auth-form';
import { UserAuthForm } from '@/auth/user-auth-form';
import { SafeKeyboardAvoidingView } from '@/components/safe-keyboard-avoiding-view';
import { SafeView } from '@/components/safe-view';
import { TabButton } from '@/components/tab-button';
import { TabsContainer } from '@/components/tabs-container';
import { useAppTheme } from '@/providers/app-theme-provider';
import { FC, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

type TabValue = 'user' | 'company';

type TabButtonData = {
  title: string;
  value: TabValue;
  Content: FC;
};

const TAB_BUTTONS_DATA: TabButtonData[] = [
  {
    title: 'User',
    value: 'user',
    Content: UserAuthForm,
  },
  {
    title: 'Company',
    value: 'company',
    Content: CompanyAuthForm,
  },
];

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const theme = useAppTheme();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const selectTab = (index: number) => {
    setActiveTabIndex(index);
    scrollRef.current?.scrollTo({ x: index * width });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex === activeTabIndex) return;
    setActiveTabIndex(slideIndex);
  };

  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.base,
        justifyContent: 'center',
      }}
      withPaddingBottom={false}
    >
      <SafeKeyboardAvoidingView>
        <TabsContainer>
          {TAB_BUTTONS_DATA.map((tabButtonData, index) => (
            <TabButton
              key={tabButtonData.value}
              selected={activeTabIndex === index}
              title={tabButtonData.title}
              titleProps={{ variant: 'titleMedium' }}
              onPress={() => selectTab(index)}
            />
          ))}
        </TabsContainer>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {TAB_BUTTONS_DATA.map((tabButtonData) => (
            <View key={tabButtonData.value} style={{ width }}>
              <View style={{ padding: 20 }}>
                <tabButtonData.Content />
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeKeyboardAvoidingView>
    </SafeView>
  );
}
