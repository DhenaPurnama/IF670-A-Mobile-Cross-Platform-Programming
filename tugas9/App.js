import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [recentImage, setRecentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      // Request media library permissions
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      
      setHasPermission(
        cameraPermission.status === 'granted' && 
        mediaLibraryPermission.status === 'granted'
      );
    })();
  }, []);

  const openCamera = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera and media library permissions are required to use this feature.');
      return;
    }

    setIsLoading(true);
    try {
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const photo = result.assets[0];
        
        // Save to device's media library
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        
        // Update recent image
        setRecentImage(photo.uri);
        
        Alert.alert(
          "Success", 
          "Photo captured and saved to your device gallery!"
        );
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take and save picture');
    } finally {
      setIsLoading(false);
    }
  };

  const openDeviceGallery = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Media library permissions are required to use this feature.');
      return;
    }

    try {
      // Open device's photo gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        selectionLimit: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selected = result.assets[0];
        setRecentImage(selected.uri);
      }
    } catch (error) {
      console.error('Error accessing gallery:', error);
      Alert.alert('Error', 'Failed to access device gallery');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Camera and media library permissions are required to use this app.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(
              cameraPermission.status === 'granted' && 
              mediaLibraryPermission.status === 'granted'
            );
          }}>
          <Text style={styles.permissionButtonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Gallery App</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={openCamera}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Processing...' : 'Open Camera'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={openDeviceGallery}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>
          {recentImage ? 'Selected/Captured Image' : 'No image selected'}
        </Text>
        
        {recentImage ? (
          <Image
            source={{ uri: recentImage }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={styles.noImageText}>
              Tap "Open Camera" to capture an image{'\n'}or{'\n'}"Open Gallery" to select from device
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Images are saved to your device gallery
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  previewTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '500',
    color: '#333',
  },
  previewImage: {
    width: '90%',
    height: 350,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noImagePlaceholder: {
    width: '90%',
    height: 350,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 20,
    color: '#d32f2f',
  },
  permissionButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});