import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./input"; 

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reusable Input Component</Text>

      {/* Input untuk Nama */}
      <Input 
        label="Name" 
        placeholder="Enter your name" 
        value={name} 
        onChangeText={setName} 
      />

      {/* Input untuk Email */}
      <Input 
        label="Email" 
        placeholder="Enter your email" 
        value={email} 
        onChangeText={setEmail} 
      />

      <Text style={styles.resultText}>Hello, {name || "Guest"}!</Text>
      <Text style={styles.resultText}>Your Email: {email || "Not provided"}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
  },
});
