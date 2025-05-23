import React, { useEffect, useState, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { getPosts } from '../services/axios';
import { PostsContext } from '../context/PostsContext';

const PostCard = ({ post, onPress }) => {
  // Split the text into sections, similar to the images shown in the requirements
  const displayTitle = post.title.substring(0, 50) + (post.title.length > 50 ? '...' : '');
  const displayBody = post.body.substring(0, 100) + (post.body.length > 100 ? '...' : '');

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(post)}>
      <Text style={styles.cardTitle}>{displayTitle}</Text>
      <Text style={styles.cardBody}>{displayBody}</Text>
    </TouchableOpacity>
  );
};

export default function PostsScreen({ navigation }) {
  const { posts, setPosts, loading, setLoading, error, setError, fetchPosts } = useContext(PostsContext);

  useEffect(() => {
    // Fetch posts when the component mounts if they haven't been loaded yet
    if (posts.length === 0) {
      fetchPosts();
    }
    
    // We don't need to refetch posts on focus anymore since we're using context
    // The updates will be handled through context state
  }, []);

  const handlePostPress = (post) => {
    navigation.navigate('Forms', { post });
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} onPress={handlePostPress} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  cardBody: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});