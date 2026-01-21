import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

type TopTab = "company" | "settings";
type SettingsScreen = "app" | "main" | "postings" | "recruiters";

type CompanyAccount = {
  email: string;
  logoUrl?: string;
};

type CompanyProfile = {
  about: string;
  name: string;
};

type Recruiter = {
  avatarUrl?: string;
  email: string;
  id: string;
  name: string;
  phone?: string;
};

type JobPost = {
  coverUrl?: string;
  id: string;
  location: string;
  rating?: number;
  salary?: string;
  title: string;
};

const uid = () => Math.random().toString(36).slice(2);

export default function ProfileScreen() {
  const [settingsScreen, setSettingsScreen] = useState<SettingsScreen>("main");
  const [tab, setTab] = useState<TopTab>("company");

  
  const [account, setAccount] = useState<CompanyAccount>({
    email: "romanstas1984@gmail.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  });

  const [company, setCompany] = useState<CompanyProfile>({
    about:
      "Tworzymy oprogramowanie i usługi, które wspierają firmy i użytkowników na całym świecie. " +
      "Budujemy rozwiązania chmurowe, narzędzia dla deweloperów oraz produkty zwiększające produktywność.",
    name: "Microsoft Corporation",
  });

  const [recruiters, setRecruiters] = useState<Recruiter[]>([
    {
      avatarUrl: "https://i.pravatar.cc/200?img=12",
      email: "romanstas1984@gmail.com",
      id: uid(),
      name: "Roman Staś",
      phone: "+48 624 836 123",
    },
    {
      avatarUrl: "https://i.pravatar.cc/200?img=47",
      email: "magdalena.balazcow@gmail.com",
      id: uid(),
      name: "Magdalena B.",
      phone: "+48 862 424 123",
    },
    {
      avatarUrl: "https://i.pravatar.cc/200?img=5",
      email: "anna.kowalska1991@gmail.com",
      id: uid(),
      name: "Anna Kowalska",
      phone: "+48 234 567 123",
    },
  ]);

  const [jobPosts, setJobPosts] = useState<JobPost[]>([
    {
      coverUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop",
      id: uid(),
      location: "Al. Jerozolimskie 195A, 02-222 Warszawa",
      rating: 4.8,
      salary: "$ 6000",
      title: "Administrator baz danych",
    },
  ]);

  const showBack = tab === "settings" && settingsScreen !== "main";

  const goBack = useCallback(() => {
    if (tab === "settings" && settingsScreen !== "main") {
      setSettingsScreen("main");
      return true;
    }
    return false;
  }, [settingsScreen, tab]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => goBack();
      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [goBack])
  );

  const headerTitle = useMemo(() => {
    if (tab === "company") return "Profil firmy";
    if (settingsScreen === "main") return "Ustawienia";
    if (settingsScreen === "postings") return "Zarządzanie ogłoszeniami";
    if (settingsScreen === "recruiters") return "Zarządzanie rekruterami";
    if (settingsScreen === "app") return "Ustawienia aplikacji";
    return "Ustawienia";
  }, [settingsScreen, tab]);

  const onAddPosting = useCallback(() => {
    const next: JobPost = {
      coverUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
      id: uid(),
      location: "Warszawa",
      rating: 4.5,
      salary: "$ 4500",
      title: "Nowe ogłoszenie",
    };
    setJobPosts((p) => [next, ...p]);
    Alert.alert("Dodano", "Dodano nowe ogłoszenie (mock).");
  }, []);

  const onManagePosting = useCallback((post: JobPost) => {
    Alert.alert("Zarządzanie ogłoszeniem", post.title);
  }, []);

  const onRecruiterSettings = useCallback((r: Recruiter) => {
    Alert.alert("Rekruter", `${r.name}\n${r.email}`);
  }, []);

  const onAddRecruiterByEmail = useCallback(
    (email: string) => {
      const trimmed = email.trim().toLowerCase();
      if (!trimmed) return;

      if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
        Alert.alert("Błąd", "Podaj poprawny adres email.");
        return;
      }

      if (recruiters.some((x) => x.email.toLowerCase() === trimmed)) {
        Alert.alert("Info", "Ten rekruter już istnieje na liście.");
        return;
      }

      setRecruiters((prev) => [
        {
          avatarUrl: "https://i.pravatar.cc/200?img=68",
          email: trimmed,
          id: uid(),
          name: "Nowy rekruter",
        },
        ...prev,
      ]);

      Alert.alert("Sukces", "Zaproszenie do rekrutera zostało wysłane (mock).");
    },
    [recruiters]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerSide}>
            {showBack ? (
              <TouchableOpacity hitSlop={8} style={styles.iconBtn} onPress={goBack}>
                <Ionicons color="#111" name="chevron-back" size={22} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconSpacer} />
            )}
          </View>

          <Text numberOfLines={1} style={styles.headerTitle}>
            {headerTitle}
          </Text>

          <View style={[styles.headerSide, styles.headerSideRight]}>
            {tab === "settings" && settingsScreen === "main" ? (
              <TouchableOpacity
                hitSlop={8}
                style={styles.iconBtn}
                onPress={() => Alert.alert("Ustawienia", "Ikona ustawień (mock).")}
              >
                <Ionicons color="#111" name="settings-outline" size={20} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconSpacer} />
            )}
          </View>
        </View>

        {!showBack ? (
          <View style={styles.topTabs}>
            <TopTabButton
              active={tab === "company"}
              icon="business-outline"
              label="Profil firmy"
              onPress={() => {
                setSettingsScreen("main");
                setTab("company");
              }}
            />
            <TopTabButton
              active={tab === "settings"}
              icon="settings-outline"
              label="Ustawienia"
              onPress={() => setTab("settings")}
            />
          </View>
        ) : null}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        {tab === "company" ? (
          <CompanyProfileView
            account={account}
            company={company}
            onChangeAccount={setAccount}
            onChangeCompany={setCompany}
          />
        ) : (
          <SettingsView
            jobPosts={jobPosts}
            recruiters={recruiters}
            screen={settingsScreen}
            onAddPosting={onAddPosting}
            onAddRecruiterByEmail={onAddRecruiterByEmail}
            onBack={goBack}
            onManagePosting={onManagePosting}
            onNavigate={setSettingsScreen}
            onRecruiterSettings={onRecruiterSettings}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


function SettingsView(props: {
  jobPosts: JobPost[];
  onAddPosting: () => void;
  onAddRecruiterByEmail: (email: string) => void;
  onBack: () => void;
  onManagePosting: (p: JobPost) => void;
  onNavigate: (s: SettingsScreen) => void;
  onRecruiterSettings: (r: Recruiter) => void;
  recruiters: Recruiter[];
  screen: SettingsScreen;
}) {
  const {
    jobPosts,
    onAddPosting,
    onAddRecruiterByEmail,
    onBack,
    onManagePosting,
    onNavigate,
    onRecruiterSettings,
    recruiters,
    screen,
  } = props;

  const ContentBack = () =>
    screen !== "main" ? (
      <View style={styles.contentBackWrap}>
        <TouchableOpacity style={styles.contentBackBtn} onPress={onBack}>
          <Ionicons color="#111" name="chevron-back" size={18} />
          <Text style={styles.contentBackText}>Wstecz</Text>
        </TouchableOpacity>
      </View>
    ) : null;

  if (screen === "recruiters") {
    return (
      <RecruitersManager
        header={<ContentBack />}
        recruiters={recruiters}
        onAddRecruiterByEmail={onAddRecruiterByEmail}
        onRecruiterSettings={onRecruiterSettings}
      />
    );
  }

  if (screen === "postings") {
    return (
      <PostingsManager
        header={<ContentBack />}
        posts={jobPosts}
        onAdd={onAddPosting}
        onManage={onManagePosting}
      />
    );
  }

  if (screen === "app") {
    return (
      <ScrollView
        contentContainerStyle={styles.screenPad}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ContentBack />
        <AppSettings />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
      <View style={styles.sp12} />
      <MenuButton label="Zarządzanie ogłoszeniami" onPress={() => onNavigate("postings")} />
      <MenuButton label="Zarządzanie rekruterami" onPress={() => onNavigate("recruiters")} />
      <MenuButton label="Ustawienia aplikacji" onPress={() => onNavigate("app")} />
      <View style={styles.sp60} />
    </ScrollView>
  );
}



function CompanyProfileView(props: {
  account: CompanyAccount;
  company: CompanyProfile;
  onChangeAccount: (a: CompanyAccount) => void;
  onChangeCompany: (c: CompanyProfile) => void;
}) {
  const { account, company, onChangeAccount, onChangeCompany } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.screenPad}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.sp16} />

      <View style={styles.logoWrap}>
        <View style={styles.logoCircle}>
          {account.logoUrl ? (
            <Image resizeMode="contain" source={{ uri: account.logoUrl }} style={styles.logoImg} />
          ) : (
            <Ionicons color="#111" name="business-outline" size={34} />
          )}
        </View>

        <TouchableOpacity
          style={styles.logoEditBadge}
          onPress={() => Alert.alert("Logo", "Podmień logo firmy (mock).")}
        >
          <Ionicons color="#fff" name="pencil" size={14} />
        </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{company.name}</Text>
      <Text style={styles.companyEmail}>{account.email}</Text>

      <View style={styles.sp18} />

      <View style={styles.aboutBox}>
        <Text style={styles.aboutLabel}>O firmie</Text>
        <TextInput
          multiline
          placeholder="Opisz firmę..."
          placeholderTextColor="#9aa0a6"
          style={styles.aboutInput}
          textAlignVertical="top"
          value={company.about}
          onChangeText={(t) => onChangeCompany({ ...company, about: t })}
        />
      </View>

      <View style={styles.sp18} />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Email kontaktowy</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email@firma.pl"
          placeholderTextColor="#9aa0a6"
          style={styles.fieldInput}
          value={account.email}
          onChangeText={(t) => onChangeAccount({ ...account, email: t })}
        />
      </View>

      <View style={styles.sp60} />
    </ScrollView>
  );
}



function RecruitersManager(props: {
  header?: React.ReactNode;
  onAddRecruiterByEmail: (email: string) => void;
  onRecruiterSettings: (r: Recruiter) => void;
  recruiters: Recruiter[];
}) {
  const { header, onAddRecruiterByEmail, onRecruiterSettings, recruiters } = props;
  const [email, setEmail] = useState("");

  const submit = () => {
    onAddRecruiterByEmail(email);
    setEmail("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.screenPad}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {header}
      <View style={styles.sp10} />

      <View style={styles.addByEmailBox}>
        <Text style={styles.addByEmailTitle}>Dodawanie rekrutera po adresie email</Text>

        <View style={styles.addByEmailRow}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="np. rekruter@firma.pl"
            placeholderTextColor="#9aa0a6"
            returnKeyType="send"
            style={styles.addByEmailInput}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={submit}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={submit}>
            <Ionicons color="#111" name="send" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sp14} />

      {recruiters.map((r) => (
        <View key={r.id} style={styles.recruiterCard}>
          <View style={styles.recruiterLeft}>
            <View style={styles.recruiterAvatar}>
              {r.avatarUrl ? (
                <Image source={{ uri: r.avatarUrl }} style={styles.recruiterAvatarImg} />
              ) : (
                <Ionicons color="#111" name="person" size={18} />
              )}
            </View>

            <View style={styles.recruiterInfo}>
              <Text style={styles.recruiterName}>{r.name}</Text>
              <Text style={styles.recruiterMeta}>{r.email}</Text>
              {r.phone ? <Text style={styles.recruiterMeta}>{r.phone}</Text> : null}
            </View>
          </View>

          <TouchableOpacity style={styles.recruiterGearBtn} onPress={() => onRecruiterSettings(r)}>
            <Ionicons color="#111" name="settings-outline" size={18} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.sp60} />
    </ScrollView>
  );
}



function PostingsManager(props: {
  header?: React.ReactNode;
  onAdd: () => void;
  onManage: (p: JobPost) => void;
  posts: JobPost[];
}) {
  const { header, onAdd, onManage, posts } = props;

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.screenPad} showsVerticalScrollIndicator={false}>
        {header}
        <View style={styles.sp10} />

        {posts.map((p) => (
          <View key={p.id} style={styles.postCard}>
            {p.coverUrl ? (
              <Image resizeMode="cover" source={{ uri: p.coverUrl }} style={styles.postCover} />
            ) : (
              <View style={[styles.postCover, styles.postCoverEmpty]}>
                <Ionicons color="#111" name="image-outline" size={24} />
              </View>
            )}

            <View style={styles.postMetaRow}>
              <Text style={styles.postCompany}>Firma</Text>
              {typeof p.rating === "number" ? (
                <View style={styles.ratingRow}>
                  <Ionicons color="#111" name="star" size={14} />
                  <Text style={styles.ratingText}>{p.rating.toFixed(1)}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.postMetaRow}>
              <Text style={styles.postTitle}>{p.title}</Text>
              <TouchableOpacity style={styles.manageBtn} onPress={() => onManage(p)}>
                <Text style={styles.manageBtnText}>Zarządzaj</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.postLocation}>{p.location}</Text>
            {p.salary ? <Text style={styles.postSalary}>{p.salary}</Text> : null}
          </View>
        ))}

        <View style={styles.sp90} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={onAdd}>
        <Ionicons color="#111" name="add" size={26} />
      </TouchableOpacity>
    </View>
  );
}


function AppSettings() {
  return (
    <View style={styles.appSettingsWrap}>
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Powiadomienia</Text>
        <TextInput placeholder="(placeholder)" placeholderTextColor="#9aa0a6" style={styles.fieldInput} />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Preferencje</Text>
        <TextInput placeholder="(placeholder)" placeholderTextColor="#9aa0a6" style={styles.fieldInput} />
      </View>

      <View style={styles.sp60} />
    </View>
  );
}


function MenuButton(props: { label: string; onPress: () => void }) {
  const { label, onPress } = props;

  return (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
      <Text style={styles.menuBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function TopTabButton(props: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const { active, icon, label, onPress } = props;

  return (
    <TouchableOpacity style={styles.topTabBtn} onPress={onPress}>
      <Ionicons color={active ? "#111" : "#777"} name={icon} size={18} />
      <Text style={[styles.topTabLabel, active ? styles.topTabLabelActive : null]}>{label}</Text>
      <View style={[styles.topTabUnderline, active ? styles.topTabUnderlineActive : null]} />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  addByEmailBox: {
    backgroundColor: "#fff",
    borderColor: "#cfcfcf",
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  addByEmailInput: {
    color: "#111",
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  addByEmailRow: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#d7d7d7",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    paddingLeft: 12,
  },
  addByEmailTitle: {
    color: "#111",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },

  appSettingsWrap: {
    paddingTop: 8,
  },

  aboutBox: {
    backgroundColor: "#fff",
    borderColor: "#d7d7d7",
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  aboutInput: {
    color: "#111",
    fontSize: 14,
    lineHeight: 20,
    minHeight: 220,
  },
  aboutLabel: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },

  companyEmail: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  companyName: {
    color: "#111",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 6,
    textAlign: "center",
  },

  contentBackBtn: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#e7e7e7",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  contentBackText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
  },
  contentBackWrap: {
    marginTop: 12,
  },

  fab: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f3f3f3",
    borderColor: "#cfcfcf",
    borderRadius: 27,
    borderWidth: 1,
    bottom: 16,
    height: 54,
    justifyContent: "center",
    position: "absolute",
    width: 54,
  },

  fieldGroup: {
    marginTop: 12,
  },
  fieldInput: {
    backgroundColor: "#fff",
    borderColor: "#d7d7d7",
    borderRadius: 14,
    borderWidth: 1,
    color: "#111",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fieldLabel: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },

  flex: {
    flex: 1,
  },

  header: {
    backgroundColor: "#fff",
    borderBottomColor: "#e7e7e7",
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerSide: {
    height: 36,
    justifyContent: "center",
    width: 44,
  },
  headerSideRight: {
    alignItems: "flex-end",
  },
  headerTitle: {
    color: "#111",
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    paddingHorizontal: 8,
    textAlign: "center",
  },

  iconBtn: {
    alignItems: "center",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  iconSpacer: {
    height: 36,
    width: 36,
  },

  logoCircle: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e7e7e7",
    borderRadius: 36,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    overflow: "hidden",
    width: 72,
  },
  logoEditBadge: {
    alignItems: "center",
    backgroundColor: "#ff3b30",
    borderColor: "#fff",
    borderRadius: 11,
    borderWidth: 2,
    bottom: -2,
    height: 22,
    justifyContent: "center",
    position: "absolute",
    right: -2,
    width: 22,
  },
  logoImg: {
    height: 56,
    width: 56,
  },
  logoWrap: {
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 8,
  },

  manageBtn: {
    backgroundColor: "#ff3b30",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  manageBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
  },

  menuBtn: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#cfcfcf",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  menuBtnText: {
    color: "#111",
    fontSize: 14,
    fontWeight: "900",
  },

  postCard: {
    backgroundColor: "#fff",
    borderColor: "#e7e7e7",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 12,
    overflow: "hidden",
  },
  postCompany: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
  },
  postCover: {
    height: 180,
    width: "100%",
  },
  postCoverEmpty: {
    alignItems: "center",
    justifyContent: "center",
  },
  postLocation: {
    color: "#666",
    fontSize: 11,
    paddingBottom: 6,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  postMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  postSalary: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  postTitle: {
    color: "#111",
    flex: 1,
    fontSize: 14,
    fontWeight: "900",
  },

  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "900",
  },

  recruiterAvatar: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e7e7e7",
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    overflow: "hidden",
    width: 44,
  },
  recruiterAvatarImg: {
    height: 44,
    width: 44,
  },
  recruiterCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#cfcfcf",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  recruiterGearBtn: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#e7e7e7",
    borderRadius: 19,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  recruiterInfo: {
    flex: 1,
  },
  recruiterLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    paddingRight: 8,
  },
  recruiterMeta: {
    color: "#666",
    fontSize: 11,
    marginTop: 2,
  },
  recruiterName: {
    color: "#111",
    fontSize: 16,
    fontWeight: "900",
  },

  safe: {
    backgroundColor: "#fff",
    flex: 1,
  },

  screenPad: {
    paddingHorizontal: 16,
  },

  sendBtn: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },

  sp10: { height: 10 },
  sp12: { height: 12 },
  sp14: { height: 14 },
  sp16: { height: 16 },
  sp18: { height: 18 },
  sp60: { height: 60 },
  sp90: { height: 90 },

  topTabBtn: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  topTabLabel: {
    color: "#777",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  topTabLabelActive: {
    color: "#111",
  },
  topTabUnderline: {
    backgroundColor: "transparent",
    borderRadius: 2,
    height: 2,
    marginTop: 6,
    width: 54,
  },
  topTabUnderlineActive: {
    backgroundColor: "#111",
  },
  topTabs: {
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    paddingBottom: 6,
  },
});
