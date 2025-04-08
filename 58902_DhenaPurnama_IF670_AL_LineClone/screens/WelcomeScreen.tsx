import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Logo LINE */}
      <Image source={require('../assets/Line-Logo.png')} style={styles.logo} />

      {/* Judul dan Deskripsi */}
      <Text style={styles.title}>Selamat Datang di LINE</Text>
      <Text style={styles.subtitle}>
        Nikmati pesan serta panggilan suara & video gratis, dan banyak lagi!
      </Text>

      {/* Tombol Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Tombol Daftar */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30, // Supaya lebih ada jarak dari atas
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    width: '80%',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#06C755',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 5,
    position: 'absolute',
    bottom: 100, // Menggeser tombol ke bawah
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 140,
    borderRadius: 5,
    position: 'absolute',
    bottom: 40, // Lebih ke bawah dari tombol login
  },
  registerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
