import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/RootStackParamList';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const friendData = [
    { id: '1', name: 'Teman', count: '668' },
    { id: '2', name: 'Grup', count: '119' },
  ];

  const serviceData = [
    { id: '1', name: 'Split Bill', icon: 'receipt-outline' },
    { id: '2', name: 'LINE Bank', icon: 'cash-outline' },
    { id: '3', name: 'Tema', icon: 'color-palette-outline' },
    { id: '4', name: 'WEBTOON', icon: 'book-outline' },
  ];

  const profileUpdateData = [
    { id: '1', name: 'Steven' },
    { id: '2', name: 'Naufal' },
    { id: '3', name: 'Thoriq' },
    { id: '4', name: 'Lia' },
    { id: '5', name: 'Davin' },
    { id: '6', name: 'Naira' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Text style={styles.userName}>Dhena Purnama</Text>
            <Text style={styles.status}>Masukkan pesan status</Text>
          </View>

          <View style={styles.rightHeader}>
            <View style={styles.iconRow}>
              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWithBadge}>
                <Ionicons name="notifications-outline" size={20} color="blue" />
                <View style={styles.badge} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="add-outline" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={20} color="blue" />
              </TouchableOpacity>
            </View>
            <Ionicons
              name="person-circle-outline"
              size={50}
              color="gray"
              style={styles.profileIcon}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <Text style={styles.searchText}>Cari</Text>
        </View>

        {/* Friend Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Teman</Text>
          <Text style={styles.viewAll}>Lihat Semua</Text>
        </View>
        {friendData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.friendItem}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendCount}>{item.count}</Text>
          </TouchableOpacity>
        ))}

        {/* Service Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Layanan</Text>
          <Text style={styles.viewAll}>Lihat Semua</Text>
        </View>
        <View style={styles.serviceContainer}>
          {serviceData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.serviceItem}>
              <Ionicons name={item.icon} size={30} color="black" />
              <Text style={styles.serviceName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Updated Profiles Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profil yang Baru Diupdate</Text>
        </View>
        <FlatList
          data={profileUpdateData}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.profileUpdateItem}>
              <Ionicons name="person-circle-outline" size={50} color="gray" />
              <Text style={styles.profileUpdateName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />

        
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="blue" />
          <Text style={styles.tabText}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.tabText}>Obrolan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Call')}>
          <Ionicons name="call-outline" size={24} color="black" />
          <Text style={styles.tabText}>Panggilan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 12,
  },
  leftHeader: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
    marginTop: 30,
  },
  userName: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  status: { fontSize: 14, color: 'gray' },
  rightHeader: { alignItems: 'center', justifyContent: 'center' },
  profileIcon: { marginLeft: 70 },
  iconRow: { flexDirection: 'row', marginBottom: 6, gap: 10 },
  iconWithBadge: { position: 'relative', marginHorizontal: 4 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  searchText: { fontSize: 16, color: 'gray', marginLeft: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAll: { fontSize: 14, color: '#007bff' },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  friendName: { flex: 1, fontSize: 16, marginLeft: 10 },
  friendCount: { fontSize: 14, color: 'gray' },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  serviceItem: { alignItems: 'center' },
  serviceName: { fontSize: 14, marginTop: 5 },
  profileUpdateItem: { alignItems: 'center', marginHorizontal: 10 },
  profileUpdateName: { fontSize: 14, marginTop: 5 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 43, 
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 14, marginTop: 4 },
});

export default HomeScreen;
