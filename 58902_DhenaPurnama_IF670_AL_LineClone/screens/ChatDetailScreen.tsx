import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // pastikan ini sesuai path file type kamu
import { RouteProp } from '@react-navigation/native';

type ChatDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatDetailScreen'>;
type ChatDetailScreenRouteProp = RouteProp<RootStackParamList, 'ChatDetailScreen'>;

type Props = {
  navigation: ChatDetailScreenNavigationProp;
  route: ChatDetailScreenRouteProp;
};

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  originalIndex?: number;
}

const ChatDetailScreen: React.FC<Props> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'lu berangkat kampus ga', sender: 'other', time: '08.01' },
    { id: '2', text: 'berangkat john', sender: 'me', time: '08.03' },
    { id: '3', text: 'makan dulu yuk', sender: 'other', time: '08.10' },
    { id: '4', text: 'oke, mau makan apa?', sender: 'me', time: '08.12' },
  ]);
  const [inputText, setInputText] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState('');
  const [callOptionsVisible, setCallOptionsVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const results = useMemo(() => {
    if (!searchMode || query.trim() === '') return [];
    const q = query.toLowerCase();
    return messages
      .map((msg, index) => ({ ...msg, originalIndex: index }))
      .filter(msg => msg.text.toLowerCase().includes(q));
  }, [messages, searchMode, query]);

  const scrollToMessage = (index: number) => {
    setSearchMode(false);
    setQuery('');
    Keyboard.dismiss();
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }, 300);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'me' ? styles.myMessageRow : styles.otherMessageRow,
      ]}
    >
      {item.sender === 'other' && (
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.chatAvatar}
        />
      )}
      <View
        style={[
          styles.messageContainer,
          item.sender === 'me' ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  const renderSearchResult = ({ item }: { item: Message }) => (
    <TouchableOpacity onPress={() => scrollToMessage(item.originalIndex!)}>
      <View style={styles.resultRow}>
        <Text numberOfLines={1} style={styles.resultText}>{item.text}</Text>
        <Text style={styles.resultTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        {searchMode ? (
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari pesan..."
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => { setSearchMode(false); setQuery(''); }}>
              <Ionicons name="close-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>John Doe</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => setSearchMode(true)}>
                <Ionicons name="search-outline" size={22} color="#007AFF" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCallOptionsVisible(true)}>
                <Ionicons name="call-outline" size={22} color="#007AFF" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('TombolGaris3')}>
                <MaterialCommunityIcons name="menu" size={24} color="#007AFF" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {searchMode ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={renderSearchResult}
          contentContainerStyle={{ padding: 10 }}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <FlatList
          ref={flatListRef}
          style={styles.chatListContainer}
          contentContainerStyle={styles.chatListContent}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
        />
      )}

      {!searchMode && (
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={26} color="#6e6e6e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={22} color="#6e6e6e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="image-outline" size={22} color="#6e6e6e" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Aa"
              placeholderTextColor="#888"
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity>
              <Ionicons name="happy-outline" size={20} color="#6e6e6e" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={callOptionsVisible}
        onRequestClose={() => setCallOptionsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setCallOptionsVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.callOption}>
              <Ionicons name="call" size={28} color="black" />
              <Text style={styles.callText}>Panggilan Suara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callOption}>
              <Ionicons name="videocam" size={28} color="black" />
              <Text style={styles.callText}>Panggilan Video</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;

// Styles tetap sama seperti sebelumnya


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbe7f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 12,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginLeft: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  chatListContainer: {
    flex: 1,
  },
  chatListContent: {
    padding: 10,
    paddingBottom: 120,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#9ee37d',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    marginLeft: 6,
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 10,
    color: 'gray',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 30, // tambah jarak bawah
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },

  iconButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
    paddingRight: 10,
  },
  resultRow: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 15,
    color: '#333',
  },
  resultTime: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginTop: 90,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  callOption: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  callText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
});
