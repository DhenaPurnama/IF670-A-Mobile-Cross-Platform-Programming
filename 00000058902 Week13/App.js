import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { supabase } from './supabase';

// Konfigurasi notifikasi lokal
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Notifikasi ditolak');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Lokasi ditolak');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const uploadToSupabase = async () => {
    if (!image || !location) {
      Alert.alert('Gagal', 'Ambil gambar dan lokasi terlebih dahulu.');
      return;
    }

    let supabaseSuccess = 0;
    let supabaseFailed = 0;

    try {
      setUploading(true);
      const fileName = `${Date.now()}.jpg`;

      const response = await fetch(image);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        supabaseFailed++;
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      const photoUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from('uploads').insert([{
        latitude: location.latitude,
        longitude: location.longitude,
        photo_url: photoUrl,
      }]);

      if (dbError) {
        supabaseFailed++;
      } else {
        supabaseSuccess++;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Status Pengiriman ke Supabase',
          body:
            `Success: ${supabaseSuccess}\n` +
            `Failed: ${supabaseFailed}`,
        },
        trigger: null,
      });

      Alert.alert('Selesai', 'Lihat notifikasi untuk hasil upload.');
      setImage(null);
      setLocation(null);
    } catch (err) {
      console.error(err);
      Alert.alert('Upload Gagal', err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Foto + Lokasi ke Supabase</Text>

      <Button title="Ambil Foto" onPress={pickImage} />
      <View style={styles.spacer} />
      <Button title="Ambil Lokasi" onPress={getLocation} />
      <View style={styles.spacer} />
      <Button title="Upload ke Supabase" onPress={uploadToSupabase} />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {location && (
        <Text style={styles.info}>
          Latitude: {location.latitude}{'\n'}
          Longitude: {location.longitude}
        </Text>
      )}
      {uploading && <Text style={styles.info}>Uploading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  spacer: { height: 10 },
  image: { width: 200, height: 200, marginTop: 20 },
  info: { marginTop: 10, textAlign: 'center' },
});
