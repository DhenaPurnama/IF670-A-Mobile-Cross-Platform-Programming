import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigator/RootStackParamList';

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const chatData = [
  {
    id: '1',
    name: 'John Doe',
    message: 'oke, mau makan apa?',
    time: '10:00',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Connor',
    message: 'Aku sudah kirim filenya ya.',
    time: '09:30',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Smith',
    message: 'Siap, nanti aku kabari lagi.',
    time: '08:50',
    unread: 1,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Linda Parker',
    message: 'Kamu bisa datang jam berapa?',
    time: 'Kemarin',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    name: 'Tom Hardy',
    message: 'Sudah saya cek dan aman.',
    time: 'Kemarin',
    unread: 3,
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

const ChatScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('ChatDetailScreen', {
          name: item.name,
          avatar: item.avatar,
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Obrolan</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="menu-outline" size={24} style={styles.icon} />
          <Ionicons name="image-outline" size={24} style={styles.icon} />
          <Ionicons name="chatbubbles-outline" size={24} style={styles.icon} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <Text style={styles.searchText}>Cari</Text>
      </View>

      {/* List Obrolan */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.tabText}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="blue" />
          <Text style={[styles.tabText, { color: 'blue' }]}>Obrolan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Call')}>
          <Ionicons name="call-outline" size={24} color="black" />
          <Text style={styles.tabText}>Panggilan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginLeft: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatMessage: { color: 'gray', fontSize: 14 },
  chatMeta: { alignItems: 'flex-end' },
  chatTime: { fontSize: 12, color: 'gray', marginBottom: 4 },
  unreadBadge: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: 'white', fontSize: 12 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 40,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    marginTop: -25,
  },
  tabText: {
    fontSize: 14,
    marginTop: 4,
    color: 'black',
  },
});

export default ChatScreen;
