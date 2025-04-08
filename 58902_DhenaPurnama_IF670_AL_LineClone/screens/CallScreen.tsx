import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigator/RootStackParamList';

type CallScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Call'>;
type CallScreenRouteProp = RouteProp<RootStackParamList, 'Call'>;

type Props = {
  navigation: CallScreenNavigationProp;
  route: CallScreenRouteProp;
};

const callData = [
  {
    id: '1',
    name: 'Farrel',
    time: 'Hari ini, 13.02',
    type: 'missed',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Manda',
    time: 'Kemarin, 21.15',
    type: 'incoming',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '3',
    name: 'Budi',
    time: 'Kemarin, 19.00',
    type: 'outgoing',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '4',
    name: 'Salsa',
    time: '2 hari lalu, 08.12',
    type: 'missed',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

const CallScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.callItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.callInfo}>
        <Text style={styles.callName}>{item.name}</Text>
        <View style={styles.callDetail}>
          <Ionicons
            name={
              item.type === 'missed'
                ? 'call-outline'
                : item.type === 'incoming'
                ? 'arrow-down-outline'
                : 'arrow-up-outline'
            }
            size={16}
            color={item.type === 'missed' ? 'red' : item.type === 'incoming' ? 'green' : 'blue'}
          />
          <Text style={styles.callTime}>{item.time}</Text>
        </View>
      </View>
      <Ionicons name="call" size={20} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panggilan</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="call-outline" size={24} style={styles.icon} />
          <Ionicons name="settings-outline" size={24} style={styles.icon} />
        </View>
      </View>

      {/* Garis pemisah */}
      <View style={styles.separator} />

      {/* List Panggilan */}
      <FlatList
        data={callData}
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
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.tabText}>Obrolan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="call-outline" size={24} color="blue" />
          <Text style={[styles.tabText, { color: 'blue' }]}>Panggilan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  callDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  callTime: {
    marginLeft: 6,
    color: 'gray',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 31,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    marginTop: 4,
    color: 'black',
  },
});

export default CallScreen;
