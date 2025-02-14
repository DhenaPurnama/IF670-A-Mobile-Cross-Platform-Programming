import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Week02 from './pages/Week02';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Week02 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
