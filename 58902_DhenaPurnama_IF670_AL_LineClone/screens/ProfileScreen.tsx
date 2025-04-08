import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [isAllowed, setIsAllowed] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
      const storedProfile = await AsyncStorage.getItem('profileImage');
      const storedCover = await AsyncStorage.getItem('coverImage');
      const storedName = await AsyncStorage.getItem('name');
      const storedStatus = await AsyncStorage.getItem('statusMessage');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedProfile) setProfileImage(storedProfile);
      if (storedCover) setCoverImage(storedCover);
      if (storedName) setName(storedName);
      if (storedStatus) setStatusMessage(storedStatus);
      if (storedUserId) setUserId(storedUserId);
    };
    initialize();
  }, []);

  const requestPermissions = async () => {
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (mediaStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Izin Diperlukan', 'Akses ke kamera dan galeri diperlukan untuk memilih gambar.');
    }
  };

  const saveImage = async (type: 'profile' | 'cover', uri: string | null) => {
    if (type === 'profile') {
      setProfileImage(uri);
      uri
        ? await AsyncStorage.setItem('profileImage', uri)
        : await AsyncStorage.removeItem('profileImage');
    } else {
      setCoverImage(uri);
      uri
        ? await AsyncStorage.setItem('coverImage', uri)
        : await AsyncStorage.removeItem('coverImage');
    }
  };

  const handleTextChange = async (key: 'name' | 'statusMessage' | 'userId', value: string) => {
    if (key === 'name') setName(value);
    if (key === 'statusMessage') setStatusMessage(value);
    if (key === 'userId') setUserId(value);
    await AsyncStorage.setItem(key, value);
  };

  const openOptions = async (type: 'profile' | 'cover') => {
    Alert.alert(
      'Pilih Gambar',
      '',
      [
        {
          text: 'Kamera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              saveImage(type, result.assets[0].uri);
            }
          },
        },
        {
          text: 'Pilih dari Galeri',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              saveImage(type, result.assets[0].uri);
            }
          },
        },
        {
          text: 'Hapus',
          onPress: () => saveImage(type, null),
          style: 'destructive',
        },
        { text: 'Batal', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderEditableItem = (
    label: string,
    value: string,
    onChange: (text: string) => void
  ) => (
    <View style={styles.itemRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.textInput}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      </View>
    </View>
  );

  const renderStaticItem = (
    label: string,
    value?: string,
    isSecondary?: boolean,
    withButton?: boolean
  ) => (
    <TouchableOpacity style={styles.itemRow}>
      <View>
        <Text style={styles.label}>{label}</Text>
        {value && (
          <Text style={isSecondary ? styles.valueSecondary : styles.valuePrimary}>
            {value}
          </Text>
        )}
      </View>
      {withButton && (
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Salin</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Saya</Text>
        <TouchableOpacity>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Background & Avatar */}
      <View style={styles.coverSection}>
        <TouchableOpacity onPress={() => openOptions('cover')}>
          <Image
            source={
              coverImage
                ? { uri: coverImage }
                : { uri: 'https://via.placeholder.com/400x120?text=Sampul' }
            }
            style={styles.coverImage}
          />
          <View style={styles.rightCameraIcon}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openOptions('profile')} style={styles.avatarWrapper}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: 'https://via.placeholder.com/60x60?text=Foto' }
            }
            style={styles.avatar}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Info Items */}
      <View style={styles.infoBox}>
        {renderEditableItem('Nama', name, (text) => handleTextChange('name', text))}
        {renderEditableItem('Pesan Status', statusMessage, (text) => handleTextChange('statusMessage', text))}
        {renderStaticItem('No. Telepon', '+62 813-8628-3938')}
        {renderEditableItem('ID Pengguna', userId, (text) => handleTextChange('userId', text))}
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Izinkan Tambah dengan ID</Text>
          <Switch value={isAllowed} onValueChange={setIsAllowed} />
        </View>
        {renderStaticItem('Kode QR Saya')}
        {renderStaticItem('Tanggal Lahir', '10 September 2003')}
        {renderStaticItem('Atur Ikon dan Sampul Profil', 'Pilih foto atau video untuk profil.', true)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
  coverSection: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -25,
    left: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0008',
    borderRadius: 12,
    padding: 4,
  },
  rightCameraIcon: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#0008',
    borderRadius: 20,
    padding: 6,
  },
  infoBox: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.3,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 2,
  },
  valuePrimary: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  valueSecondary: {
    fontSize: 16,
    color: '#ccc',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#ccc',
  },
  copyButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
  },
  copyText: {
    fontSize: 12,
    color: '#333',
  },
});

export default ProfileScreen;
