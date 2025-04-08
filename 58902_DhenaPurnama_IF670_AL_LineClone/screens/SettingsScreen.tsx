import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // 👉 Tambahkan ini
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types'; // Ganti sesuai path

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pengaturan</Text>
      </View>

      <ScrollView>
        {/* Search Placeholder */}
        <View style={styles.searchBar}>
          <Text style={{ color: '#aaa' }}>🔍 Pengaturan pencarian, artikel bantu...</Text>
        </View>

        {/* Profil */}
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="user-circle" size={24} color="#333" />
          </View>
          <Text style={styles.label}>Profil</Text>
        </TouchableOpacity>


        {/* Informasi Pribadi */}
        <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
        <SettingItem icon="person" label="Akun" />
        <SettingItem icon="lock-closed" label="Privasi" />

        {/* Pindah Akun */}
        <Text style={styles.sectionTitle}>Pencadangan dan Pindah Akun</Text>
        <SettingItem icon="cloud-upload-outline" label="Buat Cadangan Obrolan" />
        <SettingItem icon="qr-code-outline" label="Kode QR untuk Pindah Akun" />
        <SettingItem icon="shield-outline" label="Opsi Pindah Akun" />

        {/* Toko */}
        <Text style={styles.sectionTitle}>Toko</Text>
        <SettingItem icon="happy-outline" label="Stiker" />
        <SettingItem icon="color-palette-outline" label="Tema" />
        <SettingItem icon="time-outline" label="Koin" />

        {/* Umum */}
        <Text style={styles.sectionTitle}>Umum</Text>
        <SettingItem icon="notifications-outline" label="Pemberitahuan" />
        <SettingItem icon="image-outline" label="Foto & Video" />
        <SettingItem icon="chatbubble-ellipses-outline" label="Obrolan" />
        <SettingItem icon="call-outline" label="Panggilan" />
        <SettingItem icon="albums-outline" label="Album" />
        <SettingItem icon="people-outline" label="Teman" />
        <SettingItem icon="home-outline" label="Beranda" />
        <SettingItem icon="remove-circle-outline" label="Pintasan Siri" />
        <SettingItem icon="flask-outline" label="LINE Labs" />

        {/* Informasi Aplikasi */}
        <Text style={styles.sectionTitle}>Informasi Aplikasi</Text>
        <SettingItem icon="document-text-outline" label="Kebijakan Privasi" />
        <SettingItem icon="megaphone-outline" label="Pengumuman" />
        <SettingItem icon="help-circle-outline" label="Pusat Bantuan" />
        <SettingItem icon="information-circle-outline" label="Tentang LINE" />
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.item}>
    <Ionicons name={icon} size={20} color="#333" style={{ width: 30 }} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#888',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;
