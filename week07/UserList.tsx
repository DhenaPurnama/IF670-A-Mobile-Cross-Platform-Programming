import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import data from './data.json';
import styles from './styles';
import React from 'react';
import Animated, { 
  FadeInRight, 
  BounceIn,
  ZoomIn,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing
} from 'react-native-reanimated';

const UserList = ({ navigation }) => {
  return (
    <ScrollView>
      {data.map((user, index) => {
        const key = `user-${user.nim || index}`;
        // Calculate delay based on index - each user will have 200ms longer delay than the previous one
        const delayTime = index * 200;
        
        return (
          <Animated.View 
            entering={SlideInRight.delay(delayTime).duration(500).easing(Easing.bezier(0.25, 0.1, 0.25, 1).factory())}
            style={styles.container} 
            key={key}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profile", { user: user })}
            >
              <Animated.Image 
                entering={ZoomIn.delay(delayTime + 200).duration(400)}
                source={{ uri: user.image }} 
                style={styles.avatar} 
              />
              <View>
                <Animated.Text 
                  entering={FadeInRight.delay(delayTime + 300).duration(400)}
                  style={styles.boldText}
                >
                  {user.name}
                </Animated.Text>
                <Animated.Text 
                  entering={FadeInRight.delay(delayTime + 400).duration(400)}
                >
                  {user.nim}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}

export default UserList;