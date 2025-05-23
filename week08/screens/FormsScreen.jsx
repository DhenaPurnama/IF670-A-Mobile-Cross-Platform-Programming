import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { updatePost } from '../services/axios';
import { PostsContext } from '../context/PostsContext';

export default function FormsScreen({ route, navigation }) {
  const { post } = route.params;
  const { updateLocalPost } = useContext(PostsContext);
  
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePost = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Validation Error', 'Title and body cannot be empty');
      return;
    }

    setIsLoading(true);

    const updatedPost = {
      title,
      body,
      userId: post.userId
    };

    updatePost(post.id, updatedPost)
      .then(response => {
        if (response.status === 200) {
          // Update local state through context
          updateLocalPost(post.id, updatedPost);
          
          // Show success message
          Alert.alert(
            'Success',
            'Post updated successfully',
            [{ text: 'OK', onPress: () => navigation.navigate('Posts') }]
          );
        }
      })
      .catch(error => {
        console.error('Error updating post:', error);
        Alert.alert(
          'Error',
          'Failed to update post. Please try again.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.bodyInput]}
            value={body}
            onChangeText={setBody}
            placeholder="Enter body"
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdatePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>UPDATE POST</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleGoBack}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  bodyInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: '#2196F3',
  },
  backButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});