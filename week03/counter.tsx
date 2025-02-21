import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface CounterProps {
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ value, handleIncrement, handleDecrement }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Button title="INCREMENT" onPress={handleIncrement} color="blue" />
      <Button title="DECREMENT" onPress={handleDecrement} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Counter;
