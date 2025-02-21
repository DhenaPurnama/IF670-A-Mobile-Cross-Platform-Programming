import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import Counter from "./counter";
import Profile from "./profile";

const App = () => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedValue, setSavedValue] = useState(0);

  const handleIncrement = () => setValue(value + 1);
  const handleDecrement = () => setValue(value - 1);
  const handleSaveData = () => {
    setSavedName(name);
    setSavedValue(value);
  };

  return (
    <View style={styles.container}>
      {/* Input Nama di Atas */}
      <TextInput
        style={styles.input}
        placeholder="Input your name here"
        value={name}
        onChangeText={setName}
      />

      {/* Nama yang Sedang Dimasukkan */}
      <Text style={styles.label}>Nama: {name || "Belum diinput"}</Text>

      {/* Counter */}
      <Counter 
        value={value} 
        handleIncrement={handleIncrement} 
        handleDecrement={handleDecrement} 
      />

      {/* Tombol PASS VALUE */}
      <Button title="PASS VALUE" onPress={handleSaveData} color="green" />

      {/* Hasil yang Disimpan */}
      <Profile name={savedName} age={savedValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
    width: "80%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default App;
