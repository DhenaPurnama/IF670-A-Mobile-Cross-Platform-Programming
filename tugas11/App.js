import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import {supabase} from './utils/supabase'
import 'react-native-url-polyfill/auto';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [recentImage, setRecentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      // Request media library permissions
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      
      // Request location permissions
      const locationPermission = await Location.requestForegroundPermissionsAsync();
      
      setHasPermission(
        cameraPermission.status === 'granted' && 
        mediaLibraryPermission.status === 'granted' &&
        locationPermission.status === 'granted'
      );
    })();
  }, []);

  const openCamera = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera, media library, and location permissions are required to use this feature.');
      return;
    }

    setIsLoading(true);
    try {
      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
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
        
        // Update recent image and location
        setRecentImage(photo.uri);
        setLocation(currentLocation.coords);
        
        Alert.alert(
          "Success", 
          "Photo captured with location information and saved to your device gallery!"
        );
      }
    } catch (error) {
      console.error('Error taking picture or getting location:', error);
      Alert.alert('Error', 'Failed to take picture or get location information');
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
          Camera, media library, and location permissions are required to use this app.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            const locationPermission = await Location.requestForegroundPermissionsAsync();
            setHasPermission(
              cameraPermission.status === 'granted' && 
              mediaLibraryPermission.status === 'granted' &&
              locationPermission.status === 'granted'
            );
          }}>
          <Text style={styles.permissionButtonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const uploadToSupabase = async () => {
    if (!recentImage || !location) {
      Alert.alert('Error', 'No image or location data available to upload');
      return;
    }

    setIsUploading(true);
    try {
      // Generate a unique filename
      const timestamp = new Date().getTime();
      const fileName = `photo_${timestamp}.jpg`;
      
      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(recentImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('media') // Replace with your bucket name
        .upload(fileName, decode(base64Image), {
          contentType: 'image/jpeg',
        });
        
      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase
        .storage
        .from('media') // Same bucket name as above
        .getPublicUrl(fileName);
      
      // Save image metadata and location to Supabase database
      const { data, error } = await supabase
        .from('photo_locations') // Replace with your table name
        .insert([
          { 
            photo_url: publicUrl,
            latitude: location.latitude,
            longitude: location.longitude,
            taken_at: new Date().toISOString(),
          }
        ]);
        
      if (error) {
        throw new Error(error.message);
      }

      Alert.alert('Success', 'Photo and location data successfully uploaded to Supabase!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to decode base64
  // Helper function to decode base64
const decode = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

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
          <>
            <Image
              source={{ uri: recentImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            {location && (
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>Location:</Text>
                <Text style={styles.locationText}>Latitude: {location.latitude.toFixed(6)}</Text>
                <Text style={styles.locationText}>Longitude: {location.longitude.toFixed(6)}</Text>
                <TouchableOpacity 
          style={[styles.sendButton, isUploading && styles.buttonDisabled]} 
          onPress={uploadToSupabase}
          disabled={isUploading}>
          <Text style={styles.buttonText}>
            {isUploading ? 'Uploading...' : 'Send to Supabase'}
          </Text>
        </TouchableOpacity>
              </View>
            )}
          </>
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
  locationInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#2e7d32',
    marginVertical: 2,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
});