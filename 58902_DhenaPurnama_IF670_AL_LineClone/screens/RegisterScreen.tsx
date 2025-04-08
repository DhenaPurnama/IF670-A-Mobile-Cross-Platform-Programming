import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Logika pendaftaran di sini
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    // Navigasi ke layar lain setelah pendaftaran berhasil
    navigation.navigate('Login'); // Contoh navigasi ke layar Login
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Line.png')} style={styles.logo} /> 
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250, // Sesuaikan lebar logo
    height: 80, // Sesuaikan tinggi logo
    marginBottom: 20, // Jarak logo ke judul
    alignSelf: 'center', // Agar logo berada di tengah
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;