import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const DATA = [
  {
    id: "1",
    name: "Atanasius Raditya Herkisrito",
    number: "00000044898",
    image: require("../assets/1.jpeg"), 
  },
  {
    id: "2",
    name: "Farion Tekky",
    number: "00000056034",
    image: require("../assets/2.jpg"), 
  },
  {
    id: "3",
    name: "John Smith",
    number: "johnsmith@example.com",
    image: require("../assets/3.jpg"), 
  },
  {
    id: "4",
    name: "Jane Doe",
    number: "janedoe@example.com",
    image: require("../assets/4.jpg"), 
  },
  {
    id: "5",
    name: "Jennie",
    number: "jennie@example.com",
    image: require("../assets/5.jpg"), 
  },
];


const ProfileItem = ({ name, number, image }) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} /> 
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.number}>{number}</Text>
  </View>
);

export default function Week02() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfileItem {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  item: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 0, // Ubah dari 50 menjadi 0 agar berbentuk kotak
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  number: {
    fontSize: 14,
    color: "gray",
  },
});
