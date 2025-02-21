import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileProps {
  name: string;
  age: number;
}

const Profile: React.FC<ProfileProps> = ({ name, age }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nama: {name || "Belum diinput"}</Text>
      <Text style={styles.text}>Umur: {age} tahun</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
