/* eslint-disable react/jsx-sort-props */
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Tab = "data" | "settings";
type SettingsScreen = "main" | "basic" | "education" | "experience" | "skills" | "app";

type Account = {
  email: string;
  avatar: string;
};

type BasicProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  description: string;
};

type EducationItem = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  contractType: string;
  startDate: string;
  endDate: string;
};

type Skills = {
  languages: string[];
  professional: string[];
};

const uid = () => Math.random().toString(36).slice(2);

export default function ProfileScreen() {
  const [tab, setTab] = useState<Tab>("data");
  const [settingsScreen, setSettingsScreen] = useState<SettingsScreen>("main");

  const [account] = useState<Account>({
    email: "romanstać1984@gmail.com",
    avatar:
      "data:image/png;base64,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",
  });

  const [basic, setBasic] = useState<BasicProfile>({
    firstName: "Roman",
    lastName: "Stać",
    phone: "+48 624 836 123",
    description:
      "Jestem osobą otwartą, ciekawą świata i nastawioną na ciągły rozwój. Lubię uczyć się nowych rzeczy, zarówno zawodowo, jak i prywatnie – technologia to dla mnie nie tylko praca, ale też pasja. W wolnym czasie chętnie czytam o nowych trendach, podążam za aktywnie spędzam czas, co pomaga mi zachować równowagę między życiem zawodowym a prywatnym. Cenię dobrą współpracę z ludźmi, szczerość i poczucie humoru. Doświadczenie zdobyte w międzynarodowym środowisku nauczyło mnie elastyczności, odpowiedzialności i otwartości na różne perspektywy, co przekłada się na moje codzienne podejście do pracy i życia.",
  });

  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: uid(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [experience, setExperience] = useState<ExperienceItem[]>([
    {
      id: uid(),
      company: "",
      role: "",
      contractType: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [skills, setSkills] = useState<Skills>({
    languages: ["Angielski B2", "Niemiecki B1"],
    professional: [
      "Spawanie",
      "Lutowanie",
      "Zaawansowany python",
      "Junior C++",
      "Junior SQL",
      "Prawo jazdy kategorii B",
    ],
  });

  const fullName = useMemo(
    () => `${basic.firstName} ${basic.lastName}`.trim(),
    [basic.firstName, basic.lastName]
  );

  const isInSettingsSubscreen = tab === "settings" && settingsScreen !== "main";

  const goBackFromSettings = () => {
    setSettingsScreen("main");
  };

  const switchTab = (next: Tab) => {
    setTab(next);
    if (next !== "settings") setSettingsScreen("main");
  };

  return (
    <View style={styles.screen}>
      {/* Header / Back */}
      <View style={styles.header}>
        {isInSettingsSubscreen ? (
          <TouchableOpacity style={styles.backBtn} onPress={goBackFromSettings}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtnPlaceholder} />
        )}

        <Text style={styles.headerTitle}>
          {tab === "data"
            ? "Profil"
            : settingsScreen === "basic"
            ? "Zmiana danych podstawowych"
            : settingsScreen === "education"
            ? "Edukacja."
            : settingsScreen === "experience"
            ? "Doświadczenie zawodowe"
            : settingsScreen === "skills"
            ? "Umiejętności."
            : "Ustawienia"}
        </Text>

        <View style={styles.backBtnPlaceholder} />
      </View>

      {/* Top tabs */}
      {!isInSettingsSubscreen && (
        <View style={styles.topTabs}>
          <TopTab
            active={tab === "data"}
            icon={tab === "data" ? "person" : "person-outline"}
            label="Twoje dane"
            onPress={() => switchTab("data")}
          />
          <TopTab
            active={tab === "settings"}
            icon={tab === "settings" ? "settings" : "settings-outline"}
            label="Ustawienia"
            onPress={() => switchTab("settings")}
          />
        </View>
      )}

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {tab === "data" && (
          <YourData
            avatar={account.avatar}
            fullName={fullName}
            email={account.email}
            phone={basic.phone}
            description={basic.description}
          />
        )}

        {tab === "settings" && settingsScreen === "main" && (
          <SettingsMenu
            onOpen={(screen) => setSettingsScreen(screen)}
          />
        )}

        {tab === "settings" && settingsScreen === "basic" && (
          <BasicDataEditor
            accountEmail={account.email}
            basic={basic}
            onChange={setBasic}
            onSave={() => Alert.alert("Zapisano", "Dane podstawowe zapisane.")}
          />
        )}

        {tab === "settings" && settingsScreen === "education" && (
          <EducationEditor
            items={education}
            onChange={setEducation}
            onSave={() => Alert.alert("Zapisano", "Edukacja zapisana.")}
          />
        )}

        {tab === "settings" && settingsScreen === "experience" && (
          <ExperienceEditor
            items={experience}
            onChange={setExperience}
            onSave={() => Alert.alert("Zapisano", "Doświadczenie zapisane.")}
          />
        )}

        {tab === "settings" && settingsScreen === "skills" && (
          <SkillsEditor
            skills={skills}
            onChange={setSkills}
            onSave={() => Alert.alert("Zapisano", "Umiejętności zapisane.")}
          />
        )}

        {tab === "settings" && settingsScreen === "app" && (
          <AppSettings
            onSave={() =>
              Alert.alert("Zapisano", "Ustawienia aplikacji zapisane.")
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

function TopTab({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.topTab} onPress={onPress}>
      <Ionicons name={icon} size={18} color={active ? "#000" : "#666"} />
      <Text style={[styles.topTabLabel, active && styles.topTabLabelActive]}>
        {label}
      </Text>
      <View style={[styles.topTabUnderline, active && styles.topTabUnderlineActive]} />
    </TouchableOpacity>
  );
}

function YourData({
  avatar,
  fullName,
  email,
  phone,
  description,
}: {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  description: string;
}) {
  return (
    <View style={styles.centerBlock}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.avatarBadge}>
          <Ionicons name="heart" size={14} color="#fff" />
        </View>
      </View>

      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.subText}>({email})</Text>
      <Text style={styles.subText}>{phone}</Text>

      <View style={styles.descBox}>
        <Text style={styles.descText}>{description}</Text>
      </View>
    </View>
  );
}

function SettingsMenu({ onOpen }: { onOpen: (s: SettingsScreen) => void }) {
  return (
    <View style={styles.menu}>
      <MenuButton label="Dane podstawowe." onPress={() => onOpen("basic")} />
      <MenuButton label="Edukacja." onPress={() => onOpen("education")} />
      <MenuButton
        label="Doświadczenia zawodowe."
        onPress={() => onOpen("experience")}
      />
      <MenuButton label="Umiejętności." onPress={() => onOpen("skills")} />
      <MenuButton
        label="Ustawienia aplikacji."
        onPress={() => onOpen("app")}
      />
    </View>
  );
}

function MenuButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
      <Text style={styles.menuBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function BasicDataEditor({
  accountEmail,
  basic,
  onChange,
  onSave,
}: {
  accountEmail: string;
  basic: BasicProfile;
  onChange: (v: BasicProfile) => void;
  onSave: () => void;
}) {
  return (
    <View style={styles.form}>
      <TouchableOpacity style={styles.bigPlus} onPress={onSave}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>

      <LabeledInput
        label="Imię:"
        value={basic.firstName}
        onChangeText={(v) => onChange({ ...basic, firstName: v })}
      />
      <LabeledInput
        label="Nazwisko:"
        value={basic.lastName}
        onChangeText={(v) => onChange({ ...basic, lastName: v })}
      />
      <LabeledInput label="E-mail:" value={accountEmail} readOnly />
      <LabeledInput
        label="Telefon:"
        value={basic.phone}
        onChangeText={(v) => onChange({ ...basic, phone: v })}
        keyboardType="phone-pad"
      />

      <View style={styles.textAreaBlock}>
        <Text style={styles.inputLabel}>Opis profilu:</Text>
        <TextInput
          style={styles.textArea}
          value={basic.description}
          onChangeText={(v) => onChange({ ...basic, description: v })}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

function EducationEditor({
  items,
  onChange,
  onSave,
}: {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
  onSave: () => void;
}) {
  const add = () => onChange([...items, { id: uid(), school: "", degree: "", startDate: "", endDate: "" }]);

  const update = (id: string, patch: Partial<EducationItem>) => {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  return (
    <View style={styles.form}>
      {items.map((it) => (
        <React.Fragment key={it.id}>
        <View style={styles.card}>
          <LabeledInput
            label="Nazwa placówki edukacyjnej."
            value={it.school}
            onChangeText={(v) => update(it.id, { school: v })}
            placeholder="—"
          />
          <LabeledInput
            label="Stopień"
            value={it.degree}
            onChangeText={(v) => update(it.id, { degree: v })}
            placeholder="—"
          />
          <View style={styles.row2}>
            <SmallInput
              value={it.startDate}
              onChangeText={(v) => update(it.id, { startDate: v })}
              placeholder="Data rozpoczęcia."
            />
            <SmallInput
              value={it.endDate}
              onChangeText={(v) => update(it.id, { endDate: v })}
              placeholder="Data zakończenia."
            />
          </View>
        </View>
              </React.Fragment>
      ))}

      <TouchableOpacity style={styles.plusFab} onPress={add}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveLink} onPress={onSave}>
        <Text style={styles.saveLinkText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
}

function ExperienceEditor({
  items,
  onChange,
  onSave,
}: {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
  onSave: () => void;
}) {
  const add = () =>
    onChange([
      ...items,
      {
        id: uid(),
        company: "",
        role: "",
        contractType: "",
        startDate: "",
        endDate: "",
      },
    ]);

  const update = (id: string, patch: Partial<ExperienceItem>) => {
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  return (
    <View style={styles.form}>
      {items.map((it) => (
        <React.Fragment key={it.id}>
        <View style={styles.card}>
          <LabeledInput
            label="Nazwa zakładu pracy."
            value={it.company}
            onChangeText={(v) => update(it.id, { company: v })}
            placeholder="—"
          />

          <View style={styles.row2}>
            <SmallInput
              value={it.role}
              onChangeText={(v) => update(it.id, { role: v })}
              placeholder="Stanowisko."
            />
            <SmallInput
              value={it.startDate}
              onChangeText={(v) => update(it.id, { startDate: v })}
              placeholder="Data rozpoczęcia."
            />
          </View>

          <View style={styles.row2}>
            <SmallInput
              value={it.contractType}
              onChangeText={(v) => update(it.id, { contractType: v })}
              placeholder="Rodzaj umowy."
            />
            <SmallInput
              value={it.endDate}
              onChangeText={(v) => update(it.id, { endDate: v })}
              placeholder="Data zakończenia."
            />
          </View>
        </View>
              </React.Fragment>
      ))}

      <TouchableOpacity style={styles.plusFab} onPress={add}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveLink} onPress={onSave}>
        <Text style={styles.saveLinkText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
}

function SkillsEditor({
  skills,
  onChange,
  onSave,
}: {
  skills: Skills;
  onChange: (v: Skills) => void;
  onSave: () => void;
}) {
  const [addingLang, setAddingLang] = useState(false);
  const [addingProf, setAddingProf] = useState(false);
  const [newValue, setNewValue] = useState("");

  const addLang = () => {
    const v = newValue.trim();
    if (!v) return;
    onChange({ ...skills, languages: [...skills.languages, v] });
    setNewValue("");
    setAddingLang(false);
  };

  const addProf = () => {
    const v = newValue.trim();
    if (!v) return;
    onChange({ ...skills, professional: [...skills.professional, v] });
    setNewValue("");
    setAddingProf(false);
  };

  const remove = (kind: "languages" | "professional", value: string) => {
    onChange({
      ...skills,
      [kind]: skills[kind].filter((s) => s !== value),
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Umiejętności językowe:</Text>
        <View style={styles.chips}>
          {skills.languages.map((s) => (
            <React.Fragment key={s}><Chip text={s} onRemove={() => remove("languages", s)} /></React.Fragment>
          ))}
          <TouchableOpacity
            style={styles.chipPlus}
            onPress={() => {
              setAddingLang(true);
              setAddingProf(false);
              setNewValue("");
            }}
          >
            <Ionicons name="add" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {addingLang && (
          <InlineAdd
            value={newValue}
            onChange={setNewValue}
            onAdd={addLang}
            onCancel={() => {
              setAddingLang(false);
              setNewValue("");
            }}
            placeholder="Np. Angielski C1"
          />
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Umiejętności zawodowe</Text>
        <View style={styles.chips}>
          {skills.professional.map((s) => (
            <React.Fragment key={s}><Chip text={s} onRemove={() => remove("professional", s)} /></React.Fragment>
          ))}
          <TouchableOpacity
            style={styles.chipPlus}
            onPress={() => {
              setAddingProf(true);
              setAddingLang(false);
              setNewValue("");
            }}
          >
            <Ionicons name="add" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {addingProf && (
          <InlineAdd
            value={newValue}
            onChange={setNewValue}
            onAdd={addProf}
            onCancel={() => {
              setAddingProf(false);
              setNewValue("");
            }}
            placeholder="Np. React Native"
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveLink} onPress={onSave}>
        <Text style={styles.saveLinkText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
}

function AppSettings({ onSave }: { onSave: () => void }) {
  return (
    <View style={styles.form}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Ustawienia aplikacji</Text>
        <Text style={styles.subText}>
          Placeholder — dodaj tutaj np. powiadomienia, motyw, język itd.
        </Text>
      </View>

      <TouchableOpacity style={styles.saveLink} onPress={onSave}>
        <Text style={styles.saveLinkText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  readOnly,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  keyboardType?: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, readOnly && styles.inputReadOnly]}
        value={value}
        editable={!readOnly}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

function SmallInput({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      style={styles.smallInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

function Chip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
      <TouchableOpacity onPress={onRemove} style={styles.chipX}>
        <Ionicons name="close" size={14} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

function InlineAdd({
  value,
  onChange,
  onAdd,
  onCancel,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  placeholder: string;
}) {
  return (
    <View style={styles.inlineAdd}>
      <TextInput
        style={styles.inlineAddInput}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
      <TouchableOpacity style={styles.inlineAddBtn} onPress={onAdd}>
        <Text style={styles.inlineAddBtnText}>Dodaj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.inlineAddBtn, styles.inlineAddBtnGhost]}
        onPress={onCancel}
      >
        <Text style={styles.inlineAddBtnText}>Anuluj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnPlaceholder: { width: 40, height: 40 },
  headerTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },

  topTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent: "space-between",
  },
  topTab: { flex: 1, alignItems: "center" },
  topTabLabel: { marginTop: 4, fontSize: 12, color: "#666", fontWeight: "600" },
  topTabLabelActive: { color: "#000" },
  topTabUnderline: {
    marginTop: 6,
    height: 2,
    width: 48,
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  topTabUnderlineActive: { backgroundColor: "#000" },

  content: { padding: 16, paddingBottom: 40 },

  centerBlock: { alignItems: "center" },
  avatarWrap: { position: "relative", marginTop: 10, marginBottom: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#eee" },
  avatarBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E11D48",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 20, fontWeight: "800" },
  subText: { fontSize: 12, color: "#555", marginTop: 2 },

  descBox: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#CFCFCF",
  },
  descText: { fontSize: 12, color: "#333", lineHeight: 18, textAlign: "center" },

  menu: { gap: 12, marginTop: 8 },
  menuBtn: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  menuBtnText: { fontSize: 14, fontWeight: "600", color: "#111" },

  form: { gap: 14 },
  bigPlus: {
    alignSelf: "center",
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 4,
  },

  field: { gap: 6 },
  inputLabel: { fontSize: 12, color: "#333", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inputReadOnly: { backgroundColor: "#F4F4F4" },

  textAreaBlock: { gap: 6 },
  textArea: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 140,
    fontSize: 14,
    backgroundColor: "#fff",
  },

  card: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 16,
    padding: 14,
    gap: 10,
    backgroundColor: "#fff",
  },
  row2: { flexDirection: "row", gap: 10 },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    backgroundColor: "#fff",
  },

  plusFab: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  saveLink: { alignSelf: "center", marginTop: 6 },
  saveLinkText: { fontSize: 14, fontWeight: "700", color: "#111" },

  sectionCard: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
    gap: 10,
  },
  sectionHeader: { fontSize: 14, fontWeight: "800", color: "#111" },

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E9E9E9",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    gap: 6,
  },
  chipText: { fontSize: 12, fontWeight: "600", color: "#111" },
  chipX: { paddingLeft: 2 },
  chipPlus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9E9E9",
  },

  inlineAdd: { gap: 8 },
  inlineAddInput: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  inlineAddBtn: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  inlineAddBtnGhost: { borderColor: "#D0D0D0" },
  inlineAddBtnText: { fontSize: 14, fontWeight: "700", color: "#111" },
});