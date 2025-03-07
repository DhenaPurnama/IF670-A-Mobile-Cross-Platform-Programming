import React from 'react';
import { View, Text, Button } from 'react-native';

const UserDetail = ({ navigation, route }) => {
  const { name, email } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Detail</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UserDetail;
