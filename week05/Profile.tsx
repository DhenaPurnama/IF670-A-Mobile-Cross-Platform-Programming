import React from "react";
import { View, Text, Image, Button } from "react-native";

const getImage = (imageName) => {
  const images = {
    "1.jpeg": require("./assets/1.jpeg"),
    "2.jpg": require("./assets/2.jpg"),
    "3.jpg": require("./assets/3.jpg"),
    "4.jpg": require("./assets/4.jpg"),
    "5.jpg": require("./assets/5.jpg"),
  };
  return images[imageName] || null;
};

const Profile = ({ navigation, route }) => {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
      {getImage(user.image) && (
        <Image
          source={getImage(user.image)}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
      <Text style={{ fontSize: 16 }}>{user.email}</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>ID: {user.number}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Profile;
