import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsScreen from './screens/PostsScreen';
import FormsScreen from './screens/FormsScreen';
import { PostsProvider } from './context/PostsContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PostsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Posts">
          <Stack.Screen name="Posts" component={PostsScreen} />
          <Stack.Screen name="Forms" component={FormsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostsProvider>
  );
}