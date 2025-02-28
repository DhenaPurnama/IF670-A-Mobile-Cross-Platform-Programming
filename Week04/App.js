import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import userData from "./data.json"; // Pastikan path benar
import styles from "./App.styles"; // Import stylesheet eksternal

// Mapping gambar lokal dengan require()
const imageMapping = {
  "1.jpeg": require("./assets/1.jpeg"),
  "2.jpg": require("./assets/2.jpg"),
  "3.jpg": require("./assets/3.jpg"),
  "4.jpg": require("./assets/4.jpg"),
  "5.jpg": require("./assets/5.jpg"),
};

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {userData.map((user) => (
        <View style={styles.card} key={user.id}>
          {/* Gunakan mapping untuk mengambil gambar */}
          <Image source={imageMapping[user.image]} style={styles.avatar} />
          <View style={styles.description}>
            <Text style={styles.boldText}>{user.name}</Text>
            <Text style={styles.emailText}>{user.number}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
