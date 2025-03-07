import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home Screen</Text>
      <Button title="Go to Email" onPress={() => navigation.navigate('Email')} />
      <Button title="Go to User List" onPress={() => navigation.navigate('UserList')} />
    </View>
  );
};

export default HomeScreen;
