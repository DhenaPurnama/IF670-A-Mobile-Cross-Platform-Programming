import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import users from "./data.json"; 

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

const UserList = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { user: item })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            {getImage(item.image) && (
              <Image
                source={getImage(item.image)}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
              />
            )}
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserList;
