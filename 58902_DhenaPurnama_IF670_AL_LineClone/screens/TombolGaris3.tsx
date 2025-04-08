import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TombolGaris3 = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.name}>John Doe</Text>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionItem}>
          <Ionicons name="notifications-off-outline" size={24} />
          <Text style={styles.actionText}>Matikan</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="person-add-outline" size={24} />
          <Text style={styles.actionText}>Undang</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="close-circle-outline" size={24} />
          <Text style={styles.actionText}>Blokir</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="image-multiple-outline" size={22} />
          <Text style={styles.sectionTitle}>Foto & Video</Text>
        </View>
        <ScrollView horizontal style={styles.mediaScroll}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.mediaImage} />
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.mediaImage} />
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.mediaImage} />
        </ScrollView>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="image-album" size={22} />
          <Text style={styles.sectionTitle}>Album</Text>
        </View>
        <Text style={styles.albumText}>Simpan foto-foto favorit di album dan bagikan ke ruang obrolan.</Text>
        <TouchableOpacity>
          <Text style={styles.createAlbum}>Buat Album</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {[
        { icon: 'note-text-outline', label: 'Note' },
        { icon: 'calendar-outline', label: 'Acara' },
        { icon: 'link-variant', label: 'Tautan' },
        { icon: 'file-outline', label: 'File' },
        { icon: 'cog-outline', label: 'Pengaturan' },
      ].map(item => (
        <TouchableOpacity key={item.label} style={styles.menuItem}>
          <MaterialCommunityIcons name={item.icon} size={22} />
          <Text style={styles.menuText}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={18} color="#aaa" />
        </TouchableOpacity>
      ))}

      <Text style={styles.footerNote}>
        🔒 Obrolan ini dilindungi oleh Letter Sealing
      </Text>
    </ScrollView>
  );
};

export default TombolGaris3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    marginLeft: 8,
    fontWeight: '500',
  },
  mediaScroll: {
    flexDirection: 'row',
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 10,
  },
  albumText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  createAlbum: {
    color: '#007AFF',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
  },
  footerNote: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginVertical: 20,
  },
});
