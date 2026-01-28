import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CreatePostingScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleAddImage = () => {
    // TODO: Image picker logic
  };

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Błąd', 'Proszę wpisać oferowane stanowisko');
      return;
    }
    if (!salary.trim()) {
      Alert.alert('Błąd', 'Proszę wpisać wynagrodzenie');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Błąd', 'Proszę wpisać opis ogłoszenia');
      return;
    }
    // TODO: Save posting logic
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Image upload section */}
          <View style={styles.section}>
            <Text style={styles.label}>Wyślij zdjęcie:</Text>
            <TouchableOpacity style={styles.imageBox} onPress={handleAddImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Ionicons color="#999" name="add" size={40} />
              )}
            </TouchableOpacity>
          </View>

          {/* Title (Position) */}
          <View style={styles.section}>
            <Text style={styles.label}>Oferowane stanowisko:</Text>
            <TextInput
              placeholder="np. Administrator Baz Danych"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Salary */}
          <View style={styles.section}>
            <Text style={styles.label}>Wynagrodzenie:</Text>
            <TextInput
              placeholder="np. 5 000zł"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              value={salary}
              onChangeText={setSalary}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Opis:</Text>
            <TextInput
              multiline
              placeholder="Opisz ofertę pracy..."
              placeholderTextColor="#9aa0a6"
              style={[styles.input, styles.descriptionInput]}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.sp40} />
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleBack}>
          <Text style={styles.cancelBtnText}>Rezygnuj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Dodaj ogłoszenie</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopColor: '#e7e7e7',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  cancelBtn: {
    alignItems: 'center',
    backgroundColor: '#5a5a5a',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },

  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 32,
  },

  descriptionInput: {
    minHeight: 160,
  },

  image: {
    height: '100%',
    width: '100%',
  },

  imageBox: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    borderRadius: 16,
    borderWidth: 2,
    height: 180,
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
  },

  input: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    borderRadius: 12,
    borderWidth: 1,
    color: '#111',
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  label: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },

  safe: {
    backgroundColor: '#fff',
    flex: 1,
  },

  saveBtn: {
    alignItems: 'center',
    backgroundColor: '#e63946',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },

  scrollContent: {
    flexGrow: 1,
  },

  section: {
    marginBottom: 20,
  },

  sp40: {
    height: 40,
  },
});
